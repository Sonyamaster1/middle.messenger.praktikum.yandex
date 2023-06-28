enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type IOptionType = {
  method?: METHODS;
  data?: any;
  headers?: any;
};

function queryStringify(data: Record<string, any>) {
  return Object.entries(data).map(([key, value]) => key + '=' + value).join('&');
}

export class HTTPTransport {
  get(url: string, options: IOptionType = { method: METHODS.GET }): Promise<XMLHttpRequest> {
    if (options.data) {
      url += '?' + queryStringify(options.data);
      options.data = {};
    }
    return this.request(url, { ...options, method: METHODS.GET });
  }

  post(url: string, options: IOptionType = { method: METHODS.POST }): Promise<XMLHttpRequest> {
    return this.request(url, options);
  }

  put(url: string, options: IOptionType = { method: METHODS.PUT }): Promise<XMLHttpRequest> {
    return this.request(url, options);
  }

  delete(url: string, options: IOptionType = { method: METHODS.DELETE }): Promise<XMLHttpRequest> {
    return this.request(url, options);
  }

  request(url: string, options: IOptionType = { method: METHODS.GET }): Promise<XMLHttpRequest> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (!method) {
        reject('No method');
        return;
      }

      xhr.open(method, url);
      xhr.withCredentials = true;

      xhr.onload = function () {
        console.log(xhr);
        resolve(xhr);
      };

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
