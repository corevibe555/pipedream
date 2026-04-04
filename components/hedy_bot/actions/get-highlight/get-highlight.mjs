import app from "../../hedy_bot.app.mjs";

export default {
  key: "hedy_bot-get-highlight",
  name: "Get Highlight",
  description: "Retrieve details of a specific highlight including AI-generated insights. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
  version: "0.0.1",
  type: "action",
  annotations: {
    destructiveHint: false,
    openWorldHint: false,
    readOnlyHint: true,
  },
  props: {
    app,
    highlightId: {
      propDefinition: [
        app,
        "highlightId",
      ],
    },
  },
  async run({ $ }) {
    const response = await this.app.getHighlight({
      $,
      highlightId: this.highlightId,
    });
    $.export("$summary", `Successfully retrieved highlight ${this.highlightId}`);
    return response;
  },
};
