import Block from '../../utils/Block';
import template from './chats.hbs';
import styles from './chats.module.scss';
import ChatsController from '../../controllers/ChatsController';
import { Messenger } from '../../components/Messenger';
import { ChatsList } from '../../components/ChatList';

export default class ChatsPage extends Block {

  constructor() {
    super({});
  }

  protected initChildren() {
    this.children.chatsList = new ChatsList({ isLoading: false });

    this.children.messenger = new Messenger({});

    ChatsController.fetchChats().finally(() => {
      (this.children.chatsList as Block).setProps({
        isLoading: true,
      });
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { styles });
  }
}
