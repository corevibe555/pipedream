import app from "../../hedy_bot.app.mjs";

export default {
  key: "hedy_bot-get-many-sessions",
  name: "Get Many Sessions",
  description: "List and retrieve meeting sessions with transcripts, summaries, and key points. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
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
    const response = await this.app.listSessions({
      $,
      params,
    });
    const count = response.data?.length ?? 0;
    $.export("$summary", `Successfully retrieved ${count} session${count === 1
      ? ""
      : "s"}`);
    return response;
  },
};
