import { User } from '../../api/ChatsApi/ChatsApi.interfaces';
import Block from '../../utils/Block';
import { withStore } from '../../utils/Store';
import template from './chat.hbs';
import styles from './chat.module.scss';

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
