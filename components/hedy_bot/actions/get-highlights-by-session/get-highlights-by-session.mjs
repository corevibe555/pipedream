import app from "../../hedy_bot.app.mjs";

export default {
  key: "hedy_bot-get-highlights-by-session",
  name: "Get Highlights by Session",
  description: "Retrieve all highlights for a specific meeting session. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
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
    const response = await this.app.getHighlightsBySession({
      $,
      sessionId: this.sessionId,
    });
    const count = response.data?.length ?? 0;
    $.export("$summary", `Successfully retrieved ${count} highlight${count === 1
      ? ""
      : "s"} for session ${this.sessionId}`);
    return response;
  },
};
