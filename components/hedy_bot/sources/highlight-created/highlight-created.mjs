import common from "../common/base.mjs";

export default {
  ...common,
  key: "hedy_bot-highlight-created",
  name: "New Highlight Created",
  description: "Emit new event when a highlight is created during a meeting. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
  version: "0.0.1",
  type: "source",
  dedupe: "unique",
  methods: {
    ...common.methods,
    getItemId(item) {
      return item.highlightId;
    },
    getItemSummary(item) {
      return `New Highlight: ${item.title || item.highlightId}`;
    },
    getItemTimestamp(item) {
      return item.timestamp
        ? Date.parse(item.timestamp)
        : Date.now();
    },
    async getItems() {
      const response = await this.hedy.listHighlights({
        params: {
          limit: 100,
        },
      });
      return response.data ?? [];
    },
  },
};
