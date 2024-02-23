import axios from "axios";

class BaseApiService {
  http;

  constructor(resource) {
    if (!resource) throw new Error("Resource is not provided");
    this.http = axios.create({
      baseURL: `http://localhost:3000/${resource}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  buildEndpoint(options = {}) {
    let endpoint = "";

    if (options.id) {
      endpoint += "/" + options.id;
    }

    if (options.params && Object.keys(options.params).length > 0) {
      const queryParams = new URLSearchParams(options.params);
      endpoint += "?" + queryParams.toString();
    }

    return endpoint;
  }

  handleErrors(err) {
    console.log({ message: "Api service handler error", err });
  }
}

class ReadOnlyApiService extends BaseApiService {
  constructor(resource) {
    super(resource);
  }

  async get(options) {
    try {
      const response = await this.http.get(this.buildEndpoint(options));
      return response.data;
    } catch (err) {
      this.handleErrors(err);
      if (err.response && err.response.status === 404) {
        return {};
      }
      return null;
    }
  }
}

class ModelApiService extends ReadOnlyApiService {
  constructor(resource) {
    super(resource);
  }

  async post(data) {
    try {
      const response = await this.http.post("", data);
      return response.data;
    } catch (err) {
      this.handleErrors(err);
      return null;
    }
  }

  async patch(id, data) {
    try {
      const response = await this.http.patch(`/${id}`, data);
      return response.data;
    } catch (err) {
      this.handleErrors(err);
      return null;
    }
  }

  async delete(options) {
    try {
      const response = await this.http.delete(this.buildEndpoint(options));
      return response.data;
    } catch (err) {
      this.handleErrors(err);
      return null;
    }
  }
}

class AuthorsApiService extends ModelApiService {
  constructor() {
    super("authors");
  }
}

class PostsApiService extends ModelApiService {
  constructor() {
    super("posts");
  }
}

const $api = {
  authors: new AuthorsApiService(),
  posts: new PostsApiService(),
};

export default function (store) {
  try {
    store.$api = $api;
  } catch (e) {
    console.error(e);
  }
}
