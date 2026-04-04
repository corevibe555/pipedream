import app from "../../hedy_bot.app.mjs";

export default {
  key: "hedy_bot-get-session",
  name: "Get Session",
  description: "Retrieve details of a specific meeting session including transcript, summary, and key points. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
  version: "0.0.1",
  type: "action",
  annotations: {
    destructiveHint: false,
    openWorldHint: false,
    readOnlyHint: true,
  },
  props: {
    app,
    sessionId: {
      propDefinition: [
        app,
        "sessionId",
      ],
    },
  },
  async run({ $ }) {
    const response = await this.app.getSession({
      $,
      sessionId: this.sessionId,
    });
    $.export("$summary", `Successfully retrieved session ${this.sessionId}`);
    return response;
  },
};
