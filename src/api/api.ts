import { HTTPTransport } from '../utils/HttpTransport';

export abstract class API {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }
}
