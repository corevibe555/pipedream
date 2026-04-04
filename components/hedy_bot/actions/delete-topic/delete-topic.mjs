import app from "../../hedy_bot.app.mjs";

export default {
  key: "hedy_bot-delete-topic",
  name: "Delete Topic",
  description: "Delete a topic. Associated sessions will be unlinked but not deleted. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
  version: "0.0.1",
  type: "action",
  annotations: {
    destructiveHint: true,
    openWorldHint: false,
    readOnlyHint: false,
  },
  props: {
    app,
    topicId: {
      propDefinition: [
        app,
        "topicId",
      ],
    },
  },
  async run({ $ }) {
    const response = await this.app.deleteTopic({
      $,
      topicId: this.topicId,
    });
    $.export("$summary", `Successfully deleted topic ${this.topicId}`);
    return response;
  },
};
