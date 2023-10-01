import { Link } from './index.ts';
import { expect } from 'chai';
import Router from '../../utils/router.ts';
import sinon from 'sinon';

describe('Link', () => {
  it('рендер', () => {
    new Link({ to: '/' });
  });

  it('компонент ссылки является span', () => {
    const link = new Link({ to: '/' });
    const element = link.element;

    expect(element).to.be.instanceof(window.HTMLSpanElement);
  });

  it('переход по роуту при клике', () => {
    const link = new Link({ to: '/' });
    const spy = sinon.spy(Router, 'go');
    const element = link.element as HTMLSpanElement;

    element.click();

    expect(spy.calledOnce).to.eq(true);
  });
});
