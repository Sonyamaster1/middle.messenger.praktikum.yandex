import Block from '../../utils/Block';
import template from './message.hbs';

interface IMessageProps {
  user_id: number;
  content: string;
}

export default class Message extends Block {
  constructor(props: IMessageProps) {
    super(props);
    this.props = props;
  }

  protected initChildren(): void {
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
