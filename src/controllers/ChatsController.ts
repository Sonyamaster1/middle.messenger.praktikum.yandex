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
    try {
      const chats = await this.api.read();
      console.log(chats);


      chats.map(async (chat) => {
        const token = await this.getToken(chat.id);

        if (token) {
          await MessagesController.connect(chat.id, token);
        }
      });

      store.set('chats', chats);
    } catch (err) {
      console.log(err);
    }
  }

  addUserToChat(id: number, userId: number) {
    try {
      this.api.addUsers(id, [userId]);
    } catch (err) {
      console.log(err);
    }
  }

  deleteUserFromChat(id: number, userId: number) {
    try {
      this.api.removeUsers(id, [userId]);
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id: number) {
    try {

      await this.api.delete(id);

      this.fetchChats();
    } catch (err) {
      console.log(err);
    }
  }

  getToken(id: number) {
    try {

      return this.api.getToken(id);
    } catch (err) {
      console.log(err);
    }
  }

  selectChat(id: number) {
    try {

      store.set('selectedChat', id);
    } catch (err) {
      console.log(err);
    }
  }

  getChatUsers(id: number) {
    try {

      return this.api.getUsers(id);
    } catch (err) {
      console.log(err);
    }
  }

}

export default new ChatsController();

