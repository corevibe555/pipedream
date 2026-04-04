import app from "../../hedy_bot.app.mjs";

export default {
  key: "hedy_bot-delete-session-context",
  name: "Delete Session Context",
  description: "Delete a session context. If the deleted context was the default, the most recently updated remaining context will be promoted to default. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
  version: "0.0.1",
  type: "action",
  annotations: {
    destructiveHint: true,
    openWorldHint: false,
    readOnlyHint: false,
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
    const response = await this.app.deleteContext({
      $,
      contextId: this.contextId,
    });
    $.export("$summary", `Successfully deleted session context ${this.contextId}`);
    return response;
  },
};
