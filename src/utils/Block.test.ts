import esmock from 'esmock';
import { expect } from 'chai';
import sinon from 'sinon';
import type Type from './Block.ts';

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
};

describe('Block', async () => {
  const { default: Block } = await esmock('./Block', {
    './EventBus': {
      default: class {
        emit = eventBusMock.emit;

        on = eventBusMock.on;
      },
    },
  }) as { default: typeof Type };

  class ComponentMock extends Block {
  }

  it('инициализация',  () => {
    new ComponentMock({});

    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });

  it('событие CDU', () => {
    const components = new ComponentMock({});

    components.setProps({ test: 'test' });

    expect(eventBusMock.emit.calledWith('flow:component-did-update')).to.eq(true);
  });

});
