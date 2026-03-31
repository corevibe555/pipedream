import microsoftTodo from "../../microsofttodo.app.mjs";

export default {
  key: "microsofttodo-list-task-lists",
  name: "List Task Lists",
  description: "List all task lists in Microsoft To Do. [See the documentation](https://learn.microsoft.com/en-us/graph/api/todo-list-lists).",
  version: "0.0.1",
  annotations: {
    destructiveHint: false,
    openWorldHint: true,
    readOnlyHint: true,
  },
  type: "action",
  props: {
    microsoftTodo,
  },
  async run({ $ }) {
    const response = await this.microsoftTodo.listLists({
      $,
    });

    const lists = response?.value;

    if (lists) {
      $.export("$summary", `Successfully listed ${lists.length} task list${lists.length === 1
        ? ""
        : "s"}`);
    }

    return lists;
  },
};
