import app from "../../hedy_bot.app.mjs";

export default {
  key: "hedy_bot-update-topic",
  name: "Update Topic",
  description: "Update properties or custom context of an existing topic. Only provided fields will be modified. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
  version: "0.0.1",
  type: "action",
  annotations: {
    destructiveHint: false,
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
    name: {
      propDefinition: [
        app,
        "topicName",
      ],
      optional: true,
    },
    description: {
      propDefinition: [
        app,
        "topicDescription",
      ],
    },
    color: {
      propDefinition: [
        app,
        "topicColor",
      ],
    },
    iconName: {
      propDefinition: [
        app,
        "topicIconName",
      ],
    },
    topicContext: {
      propDefinition: [
        app,
        "topicContext",
      ],
      description: "Custom context/instructions for the topic (max 20,000 characters). Set to an empty string to clear.",
    },
  },
  async run({ $ }) {
    const data = {};
    if (this.name !== undefined) {
      data.name = this.name;
    }
    if (this.description !== undefined) {
      data.description = this.description;
    }
    if (this.color !== undefined) {
      data.color = this.color;
    }
    if (this.iconName !== undefined) {
      data.iconName = this.iconName;
    }
    if (this.topicContext !== undefined) {
      data.topicContext = this.topicContext || null;
    }
    const response = await this.app.updateTopic({
      $,
      topicId: this.topicId,
      data,
    });
    $.export("$summary", `Successfully updated topic ${this.topicId}`);
    return response;
  },
};
