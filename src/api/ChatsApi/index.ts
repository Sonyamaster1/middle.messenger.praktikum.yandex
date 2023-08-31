import { API } from '../api';
import { IOneChatInt, IChatDataInt } from './ChatsApi.interfaces';

export default class ChatsApi extends API {

  constructor() {
    super('/chats');
  }

  createChat(data: IChatDataInt): Promise<unknown> {
    return this.http.post('/', data);
  }

  addUser(data: any): Promise<unknown> {
    return this.http.put('/users', data);
  }

  deleteUser(data: any): Promise<unknown> {
    return this.http.delete('/users', data);
  }

  getChat(chatId: string): Promise<unknown> {
    return this.http.post('/token/' + chatId);
  }

  readChats(): Promise<IOneChatInt | unknown> {
    return this.http.get('/');
  }
}
