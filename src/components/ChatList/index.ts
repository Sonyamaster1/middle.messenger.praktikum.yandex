import template from './ChatList.hbs';
import { ChatInfo } from '../../api/ChatsApi/ChatsApi.interfaces';
import ChatsController from '../../controllers/ChatsController';
import Block from '../../utils/Block';
import store, { withStore } from '../../utils/Store';
import { Chat } from '../Chat';
import { Link } from '../Link';
import styles from './ChatList.module.scss';
import Button from '../Button';
import AuthController from '../../controllers/AuthController';
import Input from '../Input';
import UserController from '../../controllers/UserController';
import { getFormData } from '../../utils/getFormData';

interface IChatsListProps {
  chats: ChatInfo[];
  isLoading: boolean;
}

class ChatsListBase extends Block {
  constructor(props: IChatsListProps) {
    super({ ...props });
  }

  protected initChildren() {
    this.children.chats = this.createChats(this.props);
    this.children.profileLink = new Link({ to: '/settings', label: 'Профиль' });
    this.children.logoutbutton = new Button({
      text: 'Logout',
      class: 'button',
      type: 'button',
      events: {
        click: () => {AuthController.logout();},
      },
    });

    this.children.addnewchatbutton = new Button({
      text: 'Add new chat',
      class: 'button',
      type: 'button',
      events: {
        click: (e) =>  {
          e.preventDefault();
          let data = getFormData('create-chat');
          ChatsController.create(data.title);
        },
      },
    });

    this.children.addnewchatinput = new Input({
      name: 'title',
      placeholder: 'Title',
      type: 'text',
      class: 'input',
      events: {
        blur: () => {},
        focus: () => {},
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

  protected componentDidUpdate( newProps: IChatsListProps): boolean {
    this.children.chats = this.createChats(newProps);
    this.children.removechat = this.deleteChats(newProps);
    this.children.getisbyinputbtn = this.createAndDeleteUsers();
    this.children.removenewuser = this.deleteUresfromChat();
    return true;
  }

  private createChats(props: IChatsListProps) {
    return props.chats && props.chats.map((data: any) => {
      return new Chat({
        ...data,
        events: {
          click: () => {
            ChatsController.selectChat(data.id);
          },
        },
      });
    });
  }

  private deleteChats(props: IChatsListProps) {
    return props.chats && props.chats.map((data: any) => {
      return new Button({
        text: `Delete ${data.title} chat`,
        class: 'button',
        ...data,
        events: {
          click: () => {
            ChatsController.delete(data && data.id);
          },
        },
      });
    });
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

const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }));

export const ChatsList = withChats(ChatsListBase);
