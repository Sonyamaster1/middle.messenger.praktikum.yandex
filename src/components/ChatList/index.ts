import template from './ChatList.hbs';
import { ChatInfo } from '../../api/ChatsApi/ChatsApi.interfaces';
import ChatsController from '../../controllers/ChatsController';
import Block from '../../utils/Block';
import { withStore } from '../../utils/Store';
import { Chat } from '../Chat';
import { Link } from '../Link';
import styles from './ChatList.module.scss';
import Button from '../Button';
import AuthController from '../../controllers/AuthController';

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
    this.children.profileLink = new Link({ to: '/profile', label: 'Профиль' });
    this.children.button = new Button({
      text: 'Logout',
      class: 'button',
      type: 'button',
      events: {
        click: () => {AuthController.logout();},
      },
    });
  }

  protected componentDidUpdate( newProps: IChatsListProps): boolean {
    this.children.chats = this.createChats(newProps);
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

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }));

export const ChatsList = withChats(ChatsListBase);
