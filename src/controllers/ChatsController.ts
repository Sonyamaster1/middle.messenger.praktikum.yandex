import ChatsApi from '../api/ChatsApi';
import { IChatDataInt } from '../api/ChatsApi/ChatsApi.interfaces';
import store from '../utils/Store';

class ChatsController {
  private api: ChatsApi;

  socket: WebSocket | null;

  data: any;

  constructor() {
    this.api = new ChatsApi();
    this.socket = null;
  }

  async createChat(chatData: IChatDataInt) {
    await this.api.createChat(chatData);
    await this.fetchChats();
  }

  async fetchChats() {
    const chats = await this.api.readChats();
    store.set('currentChat', chats);
  }

  async addUser(chatData: string) {
    await this.api.addUser(chatData);
  }

  async deleteUser(chatData: { chatId: number; users: number[]; }) {
    await this.api.deleteUser(chatData);
  }

  async getChat(chatData: any) {
    const token: any = await this.api.getChat(chatData.chatId);
    store.set('chatId', Number(chatData.chatId));
    store.set('token', token);
    if (this.socket) {
      this.socket.close();
      store.set('localChat', { chatId: Number(chatData.chatId) });
    }
    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${chatData.user_id}/${chatData.chatId}/${token.token}`,
    );
    this.socket.addEventListener('close', (e) => {
      if (e.wasClean) {
        console.log('Все чисто');
      } else {
        console.log('Обрыв соединения');
      }
      console.log(`Код ошибки: ${e.code} Причина: ${e.reason}`);
    });

    this.socket.addEventListener('open', () => {
      console.log('Соединение установлен');
      this.socket?.send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        }),
      );
      this.socket?.addEventListener('message', (e) => {
        this.data = {
          ...JSON.parse(e.data),
          chatId: chatData.chatId,
        };

        store.set('localChat', JSON.parse(e.data));
      });
    });

    this.socket.addEventListener('error', () => {
      console.log('Error');
    });

    await this.fetchChats();
  }

  async sendMessage(newMessage: { message: any; }) {
    if (this.socket) {
      this.socket.send(
        JSON.stringify({
          content: newMessage.message,
          type: 'message',
        }),
      );

      this.socket.send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        }),
      );
    }
  }
}

export default new ChatsController();
