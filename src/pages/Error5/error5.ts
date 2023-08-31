import Button from '../../components/Button';
import Block from '../../utils/Block';
import template from './error5.hbs';
import * as styles from '../../../style.scss';

interface IError5Props {
  className: string;
}


export default class Error5Page extends Block {
  constructor(props: IError5Props) {
    super({ props });
  }

  protected initChildren(): void {
    this.children.button = new Button({
      text: 'Back to chats',
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
