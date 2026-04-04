import app from "../../hedy_bot.app.mjs";

export default {
  key: "hedy_bot-get-many-todos",
  name: "Get Many Todos",
  description: "Retrieve all todo items across all sessions. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
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
    const response = await this.app.listTodos({
      $,
    });
    const items = Array.isArray(response)
      ? response
      : response.data ?? [];
    $.export("$summary", `Successfully retrieved ${items.length} todo${items.length === 1
      ? ""
      : "s"}`);
    return response;
  },
};
