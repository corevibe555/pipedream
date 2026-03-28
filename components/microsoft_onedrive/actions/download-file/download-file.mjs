import fs from "fs";
import path from "path";
import stream from "stream";
import util from "util";
import onedrive from "../../microsoft_onedrive.app.mjs";
import httpRequest from "../../common/httpRequest.mjs";
import constants from "../../common/constants.mjs";
import { ConfigurationError } from "@pipedream/platform";

export default {
  name: "Download File",
  description: "Download a file stored in OneDrive. Optionally convert Office and other supported formats during download (e.g. to PDF) using Microsoft Graph. [See the documentation](https://learn.microsoft.com/en-us/graph/api/driveitem-get-content?view=graph-rest-1.0&tabs=http) · [Format conversion](https://learn.microsoft.com/en-us/graph/api/driveitem-get-content-format?view=graph-rest-1.0&tabs=http)",
  key: "microsoft_onedrive-download-file",
  version: "0.1.1",
  annotations: {
    destructiveHint: false,
    openWorldHint: true,
    readOnlyHint: true,
  },
  type: "action",
  props: {
    onedrive,
    fileId: {
      propDefinition: [
        onedrive,
        "fileId",
      ],
      optional: true,
    },
    filePath: {
      type: "string",
      label: "File Path",
      description: "The path to the file from the root folder, e.g., `Documents/My Subfolder/File 1.docx`. You can either provide this, or search for an existing file with the `File ID` prop.",
      optional: true,
    },
    newFileName: {
      type: "string",
      label: "New File Name",
      description: "The file name to save the downloaded content as, under the `/tmp` folder (or `STASH_DIR` when set). Include the extension (e.g. `.docx`); when using **Convert To Format**, the saved file will use that format’s extension.",
    },
    convertToFormat: {
      type: "string",
      label: "Convert To Format",
      description: "Convert the file while downloading using Microsoft Graph. See [format options](https://learn.microsoft.com/en-us/graph/api/driveitem-get-content-format?view=graph-rest-1.0&tabs=http#format-options) for supported source formats.",
      options: [
        "pdf",
        "html",
      ],
      optional: true,
    },
    syncDir: {
      type: "dir",
      accessMode: "write",
      sync: true,
    },
  },
  methods: {
    httpRequest,
    async getOriginalFileData($) {
      const metadataUrl = this.fileId
        ? `items/${this.fileId}`
        : `/root:/${encodeURI(this.filePath)}:`;
      const { name: originalFilename } = await this.httpRequest({
        $,
        url: metadataUrl,
      });
      const originalExtension = path.extname(originalFilename).slice(1)
        .toLowerCase() || undefined;
      return {
        originalFilename,
        originalExtension,
      };
    },
    /** Used only when `convertToFormat` is set (mirrors SharePoint download-file). */
    formatNewFilename() {
      const parsed = path.parse(this.newFileName);
      const base = parsed.ext
        ? parsed.name
        : this.newFileName;
      return `${base}.${this.convertToFormat.toLowerCase()}`;
    },
    validateConversionFormat(originalExtension) {
      const supportedFormats = this.convertToFormat === "pdf"
        ? constants.PDF_CONVERTIBLE_FORMATS
        : this.convertToFormat === "html"
          ? constants.HTML_CONVERTIBLE_FORMATS
          : [];
      if (!supportedFormats.includes(originalExtension)) {
        throw new ConfigurationError(`The file extension "${originalExtension}" is not supported for conversion to "${this.convertToFormat}". Supported formats are: ${supportedFormats.join(", ")}`);
      }
    },
  },
  async run({ $ }) {
    const {
      fileId, filePath, convertToFormat,
    } = this;

    if (!fileId && !filePath) {
      throw new ConfigurationError("You must specify either **File ID** or **File Path**.");
    }

    let originalFilename;
    let originalExtension;
    let filename;

    if (convertToFormat) {
      ({
        originalFilename, originalExtension,
      } = await this.getOriginalFileData($));
      this.validateConversionFormat(originalExtension);
      filename = this.formatNewFilename();
    } else {
      // Match pre–format-conversion behavior: save exactly as `newFileName` (last path segment only).
      filename = this.newFileName.split("/").pop();
    }

    const url = fileId
      ? `items/${fileId}/content`
      : `/root:/${encodeURI(filePath)}:/content`;

    let response;
    try {
      const requestOpts = {
        $,
        url,
        responseType: "stream",
      };
      if (convertToFormat) {
        requestOpts.params = {
          format: convertToFormat,
        };
      }
      response = await this.httpRequest(requestOpts);
    } catch {
      throw new ConfigurationError(`Error accessing file. Please make sure that the ${ fileId
        ? "File ID"
        : "File Path"} is correct.`);
    }

    const fileName = filename.split("/").pop();
    const baseDir = process.env.STASH_DIR || "/tmp";
    const tmpFilePath = `${baseDir}/${fileName}`;

    const pipeline = util.promisify(stream.pipeline);
    await pipeline(response, fs.createWriteStream(tmpFilePath));

    $.export("$summary", convertToFormat
      ? `Downloaded and converted to ${convertToFormat.toUpperCase()}, saved to \`${tmpFilePath}\`.`
      : `Returned file contents and saved to \`${tmpFilePath}\`.`);

    if (convertToFormat) {
      const stat = fs.statSync(tmpFilePath);
      return {
        filename,
        fileSize: `${stat.size} bytes`,
        extension: convertToFormat,
        downloadedFilepath: tmpFilePath,
        originalFilename,
        originalExtension,
      };
    }

    return tmpFilePath;
  },
};
