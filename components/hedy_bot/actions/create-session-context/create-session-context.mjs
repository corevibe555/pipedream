import app from "../../hedy_bot.app.mjs";

export default {
  key: "hedy_bot-create-session-context",
  name: "Create Session Context",
  description: "Create a new session context with custom instructions. Free tier users are limited to 1 context. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
  version: "0.0.1",
  type: "action",
  annotations: {
    destructiveHint: false,
    openWorldHint: false,
    readOnlyHint: false,
  },
  props: {
    app,
    title: {
      propDefinition: [
        app,
        "contextTitle",
      ],
    },
    content: {
      propDefinition: [
        app,
        "contextContent",
      ],
    },
    isDefault: {
      propDefinition: [
        app,
        "contextIsDefault",
      ],
    },
  },
  async run({ $ }) {
    const data = {
      title: this.title,
    };
    if (this.content) {
      data.content = this.content;
    }
    if (this.isDefault !== undefined) {
      data.isDefault = this.isDefault;
    }
    const response = await this.app.createContext({
      $,
      data,
    });
    $.export("$summary", `Successfully created session context "${this.title}"`);
    return response;
  },
};
