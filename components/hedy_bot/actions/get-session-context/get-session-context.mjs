import app from "../../hedy_bot.app.mjs";

export default {
  key: "hedy_bot-get-session-context",
  name: "Get Session Context",
  description: "Retrieve details of a specific session context. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
  version: "0.0.1",
  type: "action",
  annotations: {
    destructiveHint: false,
    openWorldHint: false,
    readOnlyHint: true,
  },
  props: {
    app,
    contextId: {
      propDefinition: [
        app,
        "contextId",
      ],
    },
  },
  async run({ $ }) {
    const response = await this.app.getContext({
      $,
      contextId: this.contextId,
    });
    $.export("$summary", `Successfully retrieved session context ${this.contextId}`);
    return response;
  },
};
