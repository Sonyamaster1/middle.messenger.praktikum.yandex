/* eslint-disable @typescript-eslint/no-useless-constructor */
import Block from '../../utils/Block';
import template from './button.hbs';

interface IButtonProps {
  text: string;
  class: string;
  events?: { click?: (e: Event) => undefined | void };
}

export default class Button extends Block {
  constructor(props: IButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
