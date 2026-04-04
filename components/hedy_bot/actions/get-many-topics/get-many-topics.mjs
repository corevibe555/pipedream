import app from "../../hedy_bot.app.mjs";

export default {
  key: "hedy_bot-get-many-topics",
  name: "Get Many Topics",
  description: "List all topics with AI insights and session counts. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
  version: "0.0.1",
  type: "action",
  annotations: {
    destructiveHint: false,
    openWorldHint: false,
    readOnlyHint: true,
  },
  props: {
    app,
  },
  async run({ $ }) {
    const response = await this.app.listTopics({
      $,
    });
    const items = response.data ?? [];
    $.export("$summary", `Successfully retrieved ${items.length} topic${items.length === 1
      ? ""
      : "s"}`);
    return response;
  },
};
