import common from "../common/base.mjs";

export default {
  ...common,
  key: "hedy_bot-session-exported",
  name: "New Session Exported",
  description: "Emit new event when a user manually exports a session. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
  version: "0.0.1",
  type: "source",
  dedupe: "unique",
  methods: {
    ...common.methods,
    getItemId(item) {
      return `${item.sessionId}-exported`;
    },
    getItemSummary(item) {
      return `Session Exported: ${item.title || item.sessionId}`;
    },
    getItemTimestamp(item) {
      return item.exportedAt
        ? Date.parse(item.exportedAt)
        : Date.now();
    },
    async getItems() {
      const response = await this.hedy.listSessions({
        params: {
          limit: 100,
        },
      });
      return (response.data ?? []).filter((session) => session.exportedAt);
    },
  },
};
