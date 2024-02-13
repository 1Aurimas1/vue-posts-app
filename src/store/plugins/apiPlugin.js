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

  getUrl() {
    return `${this.baseUrl}/${this.resource}`;
  }

  handleErrors(err) {
    console.log({ message: "Api service handler error", err });
  }
}

class ReadOnlyApiService extends BaseApiService {
  constructor(resource) {
    super(resource);
  }

  async get() {
    try {
      const response = await this.http.get();
      return response.data;
    } catch (err) {
      this.handleErrors(err);
      return null;
    }
  }
}

class AuthorsApiService extends ReadOnlyApiService {
  constructor() {
    super("authors");
  }
}

const $api = {
  authors: new AuthorsApiService(),
};

export default function (store) {
  try {
    store.$api = $api;
  } catch (e) {
    console.error(e);
  }
}
