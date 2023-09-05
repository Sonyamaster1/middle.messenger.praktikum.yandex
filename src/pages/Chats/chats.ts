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
    this.children.chatsList = new ChatsList({ isLoading: true });

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

  // старая версия
  //   constructor(props: IChatsProps) {
  //     super({ props });
  //   }

  //   protected initChildren(): void {
  //     this.children.buttonnewchat = new Button({
  //       text: 'Create new chat',
  //       class: 'button',
  //       events: {
  //         click: (e) => {
  //           e.preventDefault();
  //           let formdData = getFormData('newchat-id');
  //           ChatsController.createChat(formdData);
  //         },
  //       },
  //     });

  //     this.children.inputnewchat = new Input({
  //       name: 'title',
  //       placeholder: 'Title',
  //       type: 'text',
  //       class: 'input',
  //     });

  //     this.children.mychat = [];

  //     if (this.props?.chatsStore) {
  //       Object.entries(this.props.chatsStore).map(([value]: any) => {
  //         this.children.mychat.push(
  //           new Chat({
  //             id: value.id,
  //             created_by: value.created_by,
  //             title: value.title,
  //             user_id: this.props.userStore.id,
  //           }),
  //         );
  //       });
  //     }
  //     this.children.mymessage = [];

  //     if (this.props?.propOne) {
  //       Object.entries(this.props.propOne).map(([value]: any) => {
  //         this.children.mymessage.push(
  //           new Message({ user_id: value.user_id, content: value.content }),
  //         );
  //       });
  //     }

  //     this.children.button = new Button({
  //       text: 'Enter',
  //       class: 'button',
  //       events: {
  //         click: (e) => {
  //           e.preventDefault();
  //           let newMessage  = getFormData('message-form');
  //           ChatsController.sendMessage({
  //             ...newMessage,
  //             userId: this.props.userStore.id,
  //             chatId: this.props.propTwo,
  //             token: this.props.token,
  //           });
  //         },
  //       },
  //     });

  //     this.children.inputmessage = new Input({
  //       name: 'message',
  //       placeholder: 'Message',
  //       type: 'text',
  //       class: 'input',
  //       events: {
  //         blur: (e: any) => {
  //           if (!e.target.value.length) {
  //             createErrorMessage(e.target, validation.message.message);
  //           }
  //         },
  //         focus: () => {
  //           let error: any = document.getElementById('error');
  //           error.style.display = 'none';
  //           error.innerText = '';
  //         },
  //       },
  //     });

  //     this.children.buttonlogout = new Button({
  //       text: 'Logout',
  //       class: 'button',
  //       type: 'button',
  //       events: {
  //         click: () => { AuthController.logout(); },
  //       },
  //     });

  //     this.children.buttonuser = new Button({
  //       text: 'To User',
  //       class: 'button',
  //       events: {
  //         click: (e) => {
  //           e.preventDefault();
  //           Router.go('/profile');

  //         },
  //       },
  //     });
  //   }

  //   componentDidMount(): void {
  //     AuthController.fetchUser();
  //   }

//   render() {
//     return this.compile(template, { styles });
//   }
}
