import { ChatsApi } from '../api/ChatsApi';
import store from '../utils/Store';
import MessagesController from './MessageController';



class ChatsController {
  private readonly api: ChatsApi;

  constructor() {
    this.api = new ChatsApi;
  }

  async create(title: string) {
    await this.api.create(title);

    this.fetchChats();
  }

  async fetchChats() {
    const chats = await this.api.read();
    console.log(chats);


    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    store.set('chats', chats);
  }

  addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
  }

  deleteUserFromChat(id: number, userId: number) {
    this.api.removeUsers(id, [userId]);
  }

  async delete(id: number) {
    await this.api.delete(id);

    this.fetchChats();
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }

  getChatUsers(id: number) {
    return this.api.getUsers(id);
  }

}

export default new ChatsController();

