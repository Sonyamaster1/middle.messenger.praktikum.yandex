import { validation } from '../../constants/validation';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Block from '../../utils/Block';
import { createErrorMessage } from '../../utils/CreateErrorMessage';
import { getFormData } from '../../utils/getFormData';
import template from './chats.hbs';
import * as styles from '../../../style.scss';

interface IChatsProps {
  className: string;
}

export default class ChatsPage extends Block {
  constructor(props: IChatsProps) {
    super({ props });
  }

  protected initChildren(): void {
    this.children.messageinput = new Input({
      name: 'message',
      placeholder: 'Message',
      type: 'texr',
      class: 'message-input',
      events: {
        blur: (e: any) => {
          if (e.target.value.length < 0) {
            createErrorMessage(e.target, validation.message.message);
          }
        },
        focus: () => {
          let err = document.getElementById('error');
          err!.style.display = 'none';
          err!.innerText = '';
        },
      },
    });

    this.children.btn = new Button({
      text: '',
      class: 'send-btn',
      type: 'submit',
      link: '../User/user.html',
      events: {
        click: (e) => {
          e.preventDefault();
          getFormData('message-form');
          location.href = '/pages/User/user.html';
        },
      },
    });
  }

  render() {
    return this.compile(template, { styles });
  }
}
