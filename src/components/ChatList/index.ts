import template from './ChatList.hbs';
import { ChatInfo } from '../../api/ChatsApi/ChatsApi.interfaces';
import ChatsController from '../../controllers/ChatsController';
import Block from '../../utils/Block';
import { withStore } from '../../utils/Store';
import { Chat } from '../Chat';
import { Link } from '../Link';
import styles from './ChatList.module.scss';

interface IChatsListProps {
  chats: ChatInfo[];
  isLoading: boolean;
}

class ChatsListBase extends Block {
  constructor(props: IChatsListProps) {
    super({ ...props });
    this.props = props;
  }

  protected initChildren() {
    console.log('тут еще есть');
    if (this.children.chats) {
      console.log('а тут уже нет');
      this.children.chats = this.createChats(this.props);
      this.children.profileLink = new Link({ to: '/profile', label: 'Профиль' });
    }
    return;
  }

  protected componentDidUpdate( newProps: IChatsListProps): boolean {
    if (this.children.chats) {
      this.children.chats = this.createChats(newProps);
      return true;
    }
    return false;
  }

  private createChats(props: IChatsListProps) {
    return props && props.chats.map((data: any) => {
      console.log(data);
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
