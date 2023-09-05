import { User } from '../../api/ChatsApi/ChatsApi.interfaces';
import Block from '../../utils/Block';
import { withStore } from '../../utils/Store';
import template from './chat.hbs';
import styles from './chat.module.scss';

// interface IChatProps {
//   id: number;
//   created_by: string;
//   title: string;
//   user_id: number;
// }

// export default class Chat extends Block {
//   constructor(props: IChatProps) {
//     super(props);
//     this.props = props;
//   }

//   protected initChildren(): void {
//     this.children.getchatbutton = new Button({
//       text: 'Choose a chat',
//       class: 'button',
//       events: {
//         click: (e) => {
//           e.preventDefault();
//           let getChatButton: EventTarget | any = e.target;
//           let buttonWrapp = getChatButton.parentNode;
//           ChatsController.getChat({
//             chatId: Number(buttonWrapp.dataset.id),
//             user_id: this.props.user_id,
//           });
//         },
//       },
//     });

//     this.children.inputadduser = new Input({
//       name: 'userId',
//       events: {
//         blur: () => {},
//         focus: () => {},
//       },
//     });

//     this.children.deleteuserbutton = new Button({
//       text: 'Add a user to the chat',
//       class: 'button',
//       events: {
//         click: (e) => {
//           e.preventDefault();
//           let addUserButton: EventTarget | any = e.target;
//           let buttonWrapeer = addUserButton.parentNode;
//           let data = getFormData('add-delete-user-form');
//           ChatsController.deleteUser({
//             chatId: Number(buttonWrapeer.dataset.id),
//             users: [Number(data.userID)],
//           });
//         },
//       },
//     });
//   }

//   render() {
//     return this.compile(template, { ...this.props });
//   }
// }

interface ChatInfo {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: User,
    time: string;
    content: string;
  }
}

interface ChatProps {
  id: number;
  title: string;
  unread_count: number;
  selectedChat: ChatInfo;
  events: {
    click: () => void;
  }
}

class ChatBase extends Block {
  constructor(props: ChatProps) {
    super(props);
    this.props = props;
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, isSelected: this.props.id === this.props.selectedChat?.id, styles });
  }
}

export const withSelectedChat = withStore(state => ({ selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat) }));

export const Chat = withSelectedChat(ChatBase);
