import Router, { BlockConstructable } from './router.ts';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Router', () => {

  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };
  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  beforeEach(() => {
    Router.reset();
  });

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as BlockConstructable;

  it('метод use()', () => {
    const result = Router.use('/', BlockMock);

    expect(result).to.eq(Router);
  });

  describe('.back()', () => {
    it('переходит назад', () => {
      Router
        .use('/', BlockMock)
        .start();

      Router.back();

      expect(getContentFake.callCount).to.eq(1);
    });
  });

  describe('.forward()', () => {
    it('переходит вперед', () => {
      Router
        .use('/', BlockMock)
        .start();

      Router.forward();

      expect(getContentFake.callCount).to.eq(1);
    });
  });

  describe('.go()', () => {
    it('переходит по роуту', () => {
      Router
        .use('/', BlockMock)
        .start();

      Router.go('/');

      expect(getContentFake.callCount).to.eq(1);
    });
  });

  it('рендер страницы', () => {
    Router
      .use('/', BlockMock)
      .start();

    expect(getContentFake.callCount).to.eq(1);
  });
});
