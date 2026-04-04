import app from "../../hedy_bot.app.mjs";

export default {
  key: "hedy_bot-get-topic",
  name: "Get Topic",
  description: "Retrieve details of a specific topic including AI insights and session count. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
  version: "0.0.1",
  type: "action",
  annotations: {
    destructiveHint: false,
    openWorldHint: false,
    readOnlyHint: true,
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
    const response = await this.app.getTopic({
      $,
      topicId: this.topicId,
    });
    $.export("$summary", `Successfully retrieved topic ${this.topicId}`);
    return response;
  },
};
