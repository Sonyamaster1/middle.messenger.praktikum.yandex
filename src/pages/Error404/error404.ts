import Button from '../../components/Button';
import Block from '../../utils/Block';
import template from './error404.hbs';
import * as styles from '../../../style.scss';

interface IError404Props {
  className: string;
}


export default class Error404Page extends Block {
  constructor(props: IError404Props) {
    super({ props });
  }

  protected initChildren(): void {
    this.children.button = new Button({
      text: 'Back to chats',
      link: '../Chats/chats.html',
      type: 'button',
      class: 'error-link',
      events: {
        click: (e) => {
          e.preventDefault();
          location.href = '/pages/Chats/chats.html';
        },
      },
    });
  }

  render() {
    return this.compile(template, { styles });
  }
}
