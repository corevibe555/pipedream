import common from "../common/base.mjs";

export default {
  ...common,
  key: "hedy_bot-todo-exported",
  name: "New Todo Exported",
  description: "Emit new event when a todo item is exported from a session. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
  version: "0.0.1",
  type: "source",
  dedupe: "unique",
  methods: {
    ...common.methods,
    getItemId(item) {
      return item.id;
    },
    getItemSummary(item) {
      return `Todo Exported: ${item.text || item.id}`;
    },
    getItemTimestamp() {
      return Date.now();
    },
    async getItems() {
      const response = await this.hedy.listTodos();
      return Array.isArray(response)
        ? response
        : response.data ?? response;
    },
  },
};
