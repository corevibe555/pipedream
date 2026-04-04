import app from "../../hedy_bot.app.mjs";

export default {
  key: "hedy_bot-get-todos-by-session",
  name: "Get Todos by Session",
  description: "Retrieve all todo items for a specific meeting session. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
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
    const response = await this.app.getTodosBySession({
      $,
      sessionId: this.sessionId,
    });
    const items = response.data ?? [];
    $.export("$summary", `Successfully retrieved ${items.length} todo${items.length === 1
      ? ""
      : "s"} for session ${this.sessionId}`);
    return response;
  },
};
