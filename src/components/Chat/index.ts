import ChatsController from '../../controllers/ChatsController';
import Block from '../../utils/Block';
import { getFormData } from '../../utils/getFormData';
import Button from '../Button';
import Input from '../Input';
import template from './chat.hbs';

interface IChatProps {
  id: number;
  created_by: string;
  title: string;
  user_id: number;
}

export default class Chat extends Block {
  constructor(props: IChatProps) {
    super(props);
    this.props = props;
  }

  protected initChildren(): void {
    this.children.getchatbutton = new Button({
      text: 'Choose a chat',
      class: 'button',
      events: {
        click: (e) => {
          e.preventDefault();
          let getChatButton: EventTarget | any = e.target;
          let buttonWrapp = getChatButton.parentNode;
          ChatsController.getChat({
            chatId: Number(buttonWrapp.dataset.id),
            user_id: this.props.user_id,
          });
        },
      },
    });

    this.children.inputadduser = new Input({
      name: 'userId',
      events: {
        blur: () => {},
        focus: () => {},
      },
    });

    this.children.deleteuserbutton = new Button({
      text: 'Add a user to the chat',
      class: 'button',
      events: {
        click: (e) => {
          e.preventDefault();
          let addUserButton: EventTarget | any = e.target;
          let buttonWrapeer = addUserButton.parentNode;
          let data = getFormData('add-delete-user-form');
          ChatsController.deleteUser({
            chatId: Number(buttonWrapeer.dataset.id),
            users: [Number(data.userID)],
          });
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
