import app from "../../hedy_bot.app.mjs";

export default {
  key: "hedy_bot-get-todo",
  name: "Get Todo",
  description: "Retrieve a specific todo item from a session. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
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
    todoId: {
      propDefinition: [
        app,
        "todoId",
      ],
    },
  },
  async run({ $ }) {
    const response = await this.app.getTodo({
      $,
      sessionId: this.sessionId,
      todoId: this.todoId,
    });
    $.export("$summary", `Successfully retrieved todo ${this.todoId}`);
    return response;
  },
};
