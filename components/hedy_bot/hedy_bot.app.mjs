import { axios } from "@pipedream/platform";

export default {
  type: "app",
  app: "hedy_bot",
  propDefinitions: {
    sessionId: {
      type: "string",
      label: "Session ID",
      description: "The unique identifier of the session",
      async options({ prevContext }) {
        const params = {
          limit: 50,
        };
        if (prevContext?.after) {
          params.after = prevContext.after;
        }
        const response = await this.listSessions({
          params,
        });
        const options = response.data.map((session) => ({
          label: session.title || session.sessionId,
          value: session.sessionId,
        }));
        return {
          options,
          context: {
            after: response.pagination?.hasMore
              ? response.pagination.next
              : undefined,
          },
        };
      },
    },
    highlightId: {
      type: "string",
      label: "Highlight ID",
      description: "The unique identifier of the highlight",
      async options({ prevContext }) {
        const params = {
          limit: 50,
        };
        if (prevContext?.after) {
          params.after = prevContext.after;
        }
        const response = await this.listHighlights({
          params,
        });
        const options = response.data.map((highlight) => ({
          label: highlight.title || highlight.highlightId,
          value: highlight.highlightId,
        }));
        return {
          options,
          context: {
            after: response.pagination?.hasMore
              ? response.pagination.next
              : undefined,
          },
        };
      },
    },
    topicId: {
      type: "string",
      label: "Topic ID",
      description: "The unique identifier of the topic",
      async options() {
        const response = await this.listTopics();
        return response.data.map((topic) => ({
          label: topic.name,
          value: topic.id,
        }));
      },
    },
    contextId: {
      type: "string",
      label: "Context ID",
      description: "The unique identifier of the session context",
      async options() {
        const response = await this.listContexts();
        return response.data.map((context) => ({
          label: context.title,
          value: context.id,
        }));
      },
    },
    todoId: {
      type: "string",
      label: "Todo ID",
      description: "The unique identifier of the todo item (UUID)",
    },
    limit: {
      type: "integer",
      label: "Limit",
      description: "The number of items to return per page (1-100, default 50)",
      optional: true,
      min: 1,
      max: 100,
      default: 50,
    },
    topicName: {
      type: "string",
      label: "Name",
      description: "The name of the topic (max 100 characters)",
    },
    topicDescription: {
      type: "string",
      label: "Description",
      description: "A description of the topic (max 500 characters)",
      optional: true,
    },
    topicColor: {
      type: "string",
      label: "Color",
      description: "Hex color code for the topic (e.g., `#4A90D9`)",
      optional: true,
    },
    topicIconName: {
      type: "string",
      label: "Icon Name",
      description: "Material icon name for the topic",
      optional: true,
    },
    topicContext: {
      type: "string",
      label: "Topic Context",
      description: "Custom context/instructions for the topic (max 20,000 characters)",
      optional: true,
    },
    contextTitle: {
      type: "string",
      label: "Title",
      description: "The title of the session context (max 200 characters)",
    },
    contextContent: {
      type: "string",
      label: "Content",
      description: "The content of the session context (max 20,000 characters)",
      optional: true,
    },
    contextIsDefault: {
      type: "boolean",
      label: "Is Default",
      description: "Whether this context should be the default. If set to `true`, any existing default context will be unset.",
      optional: true,
      default: false,
    },
  },
  methods: {
    _baseUrl() {
      return "https://api.hedy.bot/v1";
    },
    _headers() {
      return {
        "Authorization": `Bearer ${this.$auth.api_key}`,
        "Content-Type": "application/json",
      };
    },
    _makeRequest({
      $ = this, path, ...opts
    }) {
      return axios($, {
        url: `${this._baseUrl()}${path}`,
        headers: this._headers(),
        ...opts,
      });
    },
    listSessions(opts = {}) {
      return this._makeRequest({
        path: "/sessions",
        ...opts,
      });
    },
    getSession({
      sessionId, ...opts
    }) {
      return this._makeRequest({
        path: `/sessions/${sessionId}`,
        ...opts,
      });
    },
    listHighlights(opts = {}) {
      return this._makeRequest({
        path: "/highlights",
        ...opts,
      });
    },
    getHighlight({
      highlightId, ...opts
    }) {
      return this._makeRequest({
        path: `/highlights/${highlightId}`,
        ...opts,
      });
    },
    getHighlightsBySession({
      sessionId, ...opts
    }) {
      return this._makeRequest({
        path: `/sessions/${sessionId}/highlights`,
        ...opts,
      });
    },
    listTodos(opts = {}) {
      return this._makeRequest({
        path: "/todos",
        ...opts,
      });
    },
    getTodo({
      sessionId, todoId, ...opts
    }) {
      return this._makeRequest({
        path: `/sessions/${sessionId}/todos/${todoId}`,
        ...opts,
      });
    },
    getTodosBySession({
      sessionId, ...opts
    }) {
      return this._makeRequest({
        path: `/sessions/${sessionId}/todos`,
        ...opts,
      });
    },
    listTopics(opts = {}) {
      return this._makeRequest({
        path: "/topics",
        ...opts,
      });
    },
    getTopic({
      topicId, ...opts
    }) {
      return this._makeRequest({
        path: `/topics/${topicId}`,
        ...opts,
      });
    },
    createTopic(opts = {}) {
      return this._makeRequest({
        method: "POST",
        path: "/topics",
        ...opts,
      });
    },
    updateTopic({
      topicId, ...opts
    }) {
      return this._makeRequest({
        method: "PATCH",
        path: `/topics/${topicId}`,
        ...opts,
      });
    },
    deleteTopic({
      topicId, ...opts
    }) {
      return this._makeRequest({
        method: "DELETE",
        path: `/topics/${topicId}`,
        ...opts,
      });
    },
    getTopicSessions({
      topicId, ...opts
    }) {
      return this._makeRequest({
        path: `/topics/${topicId}/sessions`,
        ...opts,
      });
    },
    listContexts(opts = {}) {
      return this._makeRequest({
        path: "/contexts",
        ...opts,
      });
    },
    getContext({
      contextId, ...opts
    }) {
      return this._makeRequest({
        path: `/contexts/${contextId}`,
        ...opts,
      });
    },
    createContext(opts = {}) {
      return this._makeRequest({
        method: "POST",
        path: "/contexts",
        ...opts,
      });
    },
    updateContext({
      contextId, ...opts
    }) {
      return this._makeRequest({
        method: "PATCH",
        path: `/contexts/${contextId}`,
        ...opts,
      });
    },
    deleteContext({
      contextId, ...opts
    }) {
      return this._makeRequest({
        method: "DELETE",
        path: `/contexts/${contextId}`,
        ...opts,
      });
    },
    getMe(opts = {}) {
      return this._makeRequest({
        path: "/me",
        ...opts,
      });
    },
  },
};
