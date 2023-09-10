import ChatsController from '../../controllers/ChatsController';
import MessagesController, { IMessage as MessageInfo } from '../../controllers/MessageController';
import UserController from '../../controllers/UserController';
import Block from '../../utils/Block';
import store, { withStore } from '../../utils/Store';
import { getFormData } from '../../utils/getFormData';
import Button from '../Button';
import Input from '../Input';
import { Message } from '../Message';
import template from './messenger.hbs';
import styles from './messenger.module.scss';


interface IMessengerProps {
  selectedChat: number;
  messages: MessageInfo[] | any;
  userId?: number;
}

export class MessengerBase extends Block {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: IMessengerProps) {
    super(props);
  }

  protected initChildren() {
    if (this.children.messages) {
      this.children.messages = this.createMessages(this.props);

      this.children.input = new Input({
        type: 'text',
        placeholder: 'Сообщение',
        name: 'message',
      });

      this.children.button = new Button({
        text: 'Отправить',
        type: 'button',
        events: {
          click: () => {
            const input = this.children.input as Input;
            const message = input.getValue();
            if (message.length <= 0) {
              throw new Error('Поле message не должно быть пустым');

            } else {
              MessagesController.sendMessage(this.props.selectedChat!, message);
              input.setValue('');
            }
          },
        },
      });

      this.children.removebtn =  new Button({
        text: 'Delete this chat',
        class: 'button',
        events: {
          click: () => {
            const currentId = store.getState().selectedChat;
            if (currentId) {
              ChatsController.delete(currentId);
            }
          },
        },
      });

      this.children.logininput = new Input({
        name: 'login',
        placeholder: 'Login user',
        type: 'text',
        class: 'input',
        events: {
          blur: () => {},
          focus: () => {},
        },
      });
    }
  }

  protected componentDidUpdate( newProps: IMessengerProps): boolean {
    this.children.messages = this.createMessages(newProps);
    this.children.getisbyinputbtn = this.createAndDeleteUsers();
    this.children.removenewuser = this.deleteUresfromChat();
    return true;
  }

  private createMessages(props: IMessengerProps) {
    if (props && props.messages) {
      return props.messages.map((data: any) => {
        return new Message({ ...data, isMine: props.userId === data.user_id });
      });
    }
    return;
  }

  private createAndDeleteUsers() {
    return new Button({
      text: 'Add new user',
      class: 'button',
      type: 'button',
      events: {
        click:  async (e) => {
          e.preventDefault();
          let data = getFormData('id-by-input');
          await UserController.getUserId(data);
          const userId = store.getState().selectedUser?.map((el: any) => el.id);
          if (userId?.length !== 1 || !userId) {
            throw new Error('Пользователь не найден');
          }
          console.log(+userId);
          const userList = store.getState().selectedChat;

          const users: any = userList && ChatsController.getChatUsers(userList);

          const selectedChatId = store.getState().selectedChat;

          const selectedId = (await users).map((el: any) => el.id);

          if (!selectedId.includes(+userId) && selectedChatId && selectedId.length <= 2) {
            await ChatsController.addUserToChat(selectedChatId, +userId);
            console.log('Пользователь добавлен');
          } else {
            console.log('Ошибка в добавлении пользователя');
          }
          if (userList) {
            ChatsController.getChatUsers(userList);
          }
        },
      },
    });
  }

  private deleteUresfromChat() {
    return new Button({
      text: 'Delete user',
      class: 'button',
      type: 'button',
      events: {
        click: async (e) => {
          e.preventDefault();
          let data = getFormData('id-by-input');
          await UserController.getUserId(data);
          const userId = store.getState().selectedUser?.map((el: any) => el.id);
          if (userId?.length !== 1 || !userId) {
            throw new Error('Пользователь не найден');
          }
          console.log(+userId);
          const userList = store.getState().selectedChat;

          const users: any = userList && ChatsController.getChatUsers(userList);

          const selectedChatId = store.getState().selectedChat;

          const selectedId = (await users).map((el: any) => el.id);
          if (selectedId.includes(+userId) && selectedChatId && userId) {
            await ChatsController.deleteUserFromChat(selectedChatId, +userId);
            console.log('Пользователь удален');
          }
          if (userList) {
            ChatsController.getChatUsers(userList);
          }
        },
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}

const withSelectedChatMessages = withStore((state: any) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id,
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id,
  };
});

export const Messenger = withSelectedChatMessages(MessengerBase);
