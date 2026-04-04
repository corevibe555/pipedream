import hedy from "../../hedy_bot.app.mjs";
import { DEFAULT_POLLING_SOURCE_TIMER_INTERVAL } from "@pipedream/platform";

export default {
  props: {
    hedy,
    db: "$.service.db",
    timer: {
      type: "$.interface.timer",
      default: {
        intervalSeconds: DEFAULT_POLLING_SOURCE_TIMER_INTERVAL,
      },
    },
  },
  methods: {
    _getSavedItems() {
      return this.db.get("savedItems") ?? [];
    },
    _setSavedItems(value) {
      this.db.set("savedItems", value);
    },
    getItemId() {
      throw new Error("getItemId is not implemented");
    },
    getItemSummary() {
      throw new Error("getItemSummary is not implemented");
    },
    getItemTimestamp() {
      return Date.now();
    },
    async getItems() {
      throw new Error("getItems is not implemented");
    },
    async processItems(maxItems = 0) {
      const savedItems = this._getSavedItems();
      const items = await this.getItems();

      const newItems = items.filter((item) => !savedItems.includes(this.getItemId(item)));

      if (maxItems && newItems.length > maxItems) {
        newItems.length = maxItems;
      }

      newItems.reverse().forEach((item) => {
        const id = this.getItemId(item);
        this.$emit(item, {
          id,
          summary: this.getItemSummary(item),
          ts: this.getItemTimestamp(item),
        });
        savedItems.push(id);
      });

      this._setSavedItems(savedItems);
    },
  },
  hooks: {
    async deploy() {
      await this.processItems(25);
    },
  },
  async run() {
    await this.processItems();
  },
};
