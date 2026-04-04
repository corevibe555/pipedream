import app from "../../hedy_bot.app.mjs";

export default {
  key: "hedy_bot-get-topic-sessions",
  name: "Get Topic Sessions",
  description: "List all sessions associated with a specific topic, ordered by start time. [See the documentation](https://help.hedy.bot/en/articles/11663570-hedy-api)",
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
    limit: {
      propDefinition: [
        app,
        "limit",
      ],
    },
    startAfter: {
      type: "string",
      label: "Start After",
      description: "Session ID cursor for pagination to fetch the next page of results",
      optional: true,
    },
  },
  async run({ $ }) {
    const params = {};
    if (this.limit) {
      params.limit = this.limit;
    }
    if (this.startAfter) {
      params.startAfter = this.startAfter;
    }
    const response = await this.app.getTopicSessions({
      $,
      topicId: this.topicId,
      params,
    });
    const sessions = response.data?.sessions ?? [];
    $.export("$summary", `Successfully retrieved ${sessions.length} session${sessions.length === 1
      ? ""
      : "s"} for topic ${this.topicId}`);
    return response;
  },
};
