import app from "../../hedy_bot.app.mjs";

export default {
  key: "hedy_bot-get-many-highlights",
  name: "Get Many Highlights",
  description: "Retrieve important moments with AI-generated insights across all sessions. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
  version: "0.0.1",
  type: "action",
  annotations: {
    destructiveHint: false,
    openWorldHint: false,
    readOnlyHint: true,
  },
  props: {
    app,
    limit: {
      propDefinition: [
        app,
        "limit",
      ],
    },
    after: {
      type: "string",
      label: "After",
      description: "Pagination cursor from a previous response to fetch the next page of results",
      optional: true,
    },
  },
  async run({ $ }) {
    const params = {};
    if (this.limit) {
      params.limit = this.limit;
    }
    if (this.after) {
      params.after = this.after;
    }
    const response = await this.app.listHighlights({
      $,
      params,
    });
    const count = response.data?.length ?? 0;
    $.export("$summary", `Successfully retrieved ${count} highlight${count === 1
      ? ""
      : "s"}`);
    return response;
  },
};
