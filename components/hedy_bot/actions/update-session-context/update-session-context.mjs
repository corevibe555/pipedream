import app from "../../hedy_bot.app.mjs";

export default {
  key: "hedy_bot-update-session-context",
  name: "Update Session Context",
  description: "Update an existing session context. Only provided fields will be modified. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
  version: "0.0.1",
  type: "action",
  annotations: {
    destructiveHint: false,
    openWorldHint: false,
    readOnlyHint: false,
  },
  props: {
    app,
    contextId: {
      propDefinition: [
        app,
        "contextId",
      ],
    },
    title: {
      propDefinition: [
        app,
        "contextTitle",
      ],
      optional: true,
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
    const data = {};
    if (this.title !== undefined) {
      data.title = this.title;
    }
    if (this.content !== undefined) {
      data.content = this.content;
    }
    if (this.isDefault !== undefined) {
      data.isDefault = this.isDefault;
    }
    const response = await this.app.updateContext({
      $,
      contextId: this.contextId,
      data,
    });
    $.export("$summary", `Successfully updated session context ${this.contextId}`);
    return response;
  },
};
