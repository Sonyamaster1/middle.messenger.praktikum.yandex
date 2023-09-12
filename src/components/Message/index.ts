/* eslint-disable @typescript-eslint/no-useless-constructor */
import Block from '../../utils/Block';
import template from './message.hbs';
import styles from './message.module.scss';

interface IMessageProps {
  content: string;
  isMine: boolean;
}

export class Message extends Block {
  constructor(props: IMessageProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
