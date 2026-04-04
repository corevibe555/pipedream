import app from "../../hedy_bot.app.mjs";

export default {
  key: "hedy_bot-get-many-session-contexts",
  name: "Get Many Session Contexts",
  description: "List all saved session contexts ordered by most recently updated. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
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
    const response = await this.app.listContexts({
      $,
    });
    const items = response.data ?? [];
    $.export("$summary", `Successfully retrieved ${items.length} session context${items.length === 1
      ? ""
      : "s"}`);
    return response;
  },
};
