/* eslint-disable @typescript-eslint/no-useless-constructor */
import Block from '../../utils/Block';
import template from './input.hbs';

interface IInputProps {
  name?: string;
  placeholder?: string;
  type?: string;
  class?: string;
  events?: {
    blur?: (e: Event) => void;
    focus?: (e: Event) => void;
  };
}

export default class Input extends Block {
  constructor(props: IInputProps) {
    super(props);
  }

  public getName() {
    return (this.element as HTMLInputElement).name;
  }

  public setValue(value: string) {
    return (this.element as HTMLInputElement).value = value;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
