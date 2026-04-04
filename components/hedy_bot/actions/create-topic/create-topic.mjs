import app from "../../hedy_bot.app.mjs";

export default {
  key: "hedy_bot-create-topic",
  name: "Create Topic",
  description: "Create a new topic for organizing meeting sessions with optional custom instructions. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
  version: "0.0.1",
  type: "action",
  annotations: {
    destructiveHint: false,
    openWorldHint: false,
    readOnlyHint: false,
  },
  props: {
    app,
    name: {
      propDefinition: [
        app,
        "topicName",
      ],
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
    },
  },
  async run({ $ }) {
    const data = {
      name: this.name,
    };
    if (this.description) {
      data.description = this.description;
    }
    if (this.color) {
      data.color = this.color;
    }
    if (this.iconName) {
      data.iconName = this.iconName;
    }
    if (this.topicContext) {
      data.topicContext = this.topicContext;
    }
    const response = await this.app.createTopic({
      $,
      data,
    });
    $.export("$summary", `Successfully created topic "${this.name}"`);
    return response;
  },
};
