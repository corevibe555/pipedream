import common from "../common/base.mjs";

export default {
  ...common,
  key: "hedy_bot-session-ended",
  name: "New Session Ended",
  description: "Emit new event when a meeting session completes processing. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
  version: "0.0.1",
  type: "source",
  dedupe: "unique",
  methods: {
    ...common.methods,
    getItemId(item) {
      return `${item.sessionId}-ended`;
    },
    getItemSummary(item) {
      return `Session Ended: ${item.title || item.sessionId}`;
    },
    getItemTimestamp(item) {
      return item.endTime
        ? Date.parse(item.endTime)
        : Date.now();
    },
    async getItems() {
      const response = await this.hedy.listSessions({
        params: {
          limit: 100,
        },
      });
      return (response.data ?? []).filter((session) => session.endTime);
    },
  },
};
