import common from "../common/base.mjs";

export default {
  ...common,
  key: "hedy_bot-session-created",
  name: "New Session Created",
  description: "Emit new event when a new meeting session starts. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
  version: "0.0.1",
  type: "source",
  dedupe: "unique",
  methods: {
    ...common.methods,
    getItemId(item) {
      return item.sessionId;
    },
    getItemSummary(item) {
      return `New Session: ${item.title || item.sessionId}`;
    },
    getItemTimestamp(item) {
      return item.startTime
        ? Date.parse(item.startTime)
        : Date.now();
    },
    async getItems() {
      const response = await this.hedy.listSessions({
        params: {
          limit: 100,
        },
      });
      return response.data ?? [];
    },
  },
};
