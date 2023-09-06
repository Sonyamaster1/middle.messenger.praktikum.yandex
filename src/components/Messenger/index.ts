import MessagesController, { IMessage as MessageInfo } from '../../controllers/MessageController';
import Block from '../../utils/Block';
import { withStore } from '../../utils/Store';
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

            input.setValue('');

            MessagesController.sendMessage(this.props.selectedChat!, message);
          },
        },
      });
    }
  }

  protected componentDidUpdate( newProps: IMessengerProps): boolean {
    this.children.messages = this.createMessages(newProps);
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
