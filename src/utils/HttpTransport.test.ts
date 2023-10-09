import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import HTTPTransport from './HttpTransport.ts';
import { expect } from 'chai';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  let requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });

    instance = new HTTPTransport('/auth');
  });

  afterEach(() => {
    requests = [];
  });

  it('.get() should send GET request', () => {
    instance.get('/user');

    const [request] = requests;

    expect(request.method).to.eq('Get');
  });

  it('.post() should send POST request', () => {
    instance.post('/user');

    const [request] = requests;

    expect(request.method).to.eq('Post');
  });

  it('.delete() should send DELETE request', () => {
    instance.delete('/user', '');

    const [request] = requests;

    expect(request.method).to.eq('Delete');
  });

  it('.patch() should send PATCH request', () => {
    instance.patch('/user', '');

    const [request] = requests;

    expect(request.method).to.eq('Patch');
  });

  it('.put() should send PUT request', () => {
    instance.put('/user', '');

    const [request] = requests;

    expect(request.method).to.eq('Put');
  });
});
