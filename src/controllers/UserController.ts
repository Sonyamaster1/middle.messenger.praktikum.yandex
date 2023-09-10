import UserApi from '../api/UserApi';
import store from '../utils/Store';

class UserController {
  api: any;

  constructor() {
    this.api = new UserApi();
  }

  async putUserInfo(userData: string) {
    await this.api.putUserInfo(userData);
  }

  async putUserAvatar(userData: FormData) {
    const newUser = await this.api.putUserAvatar(userData);
    store.set('user', newUser);
  }

  async putPassword(userData: string) {
    await this.api.putPassword(userData);
  }

  async getUserId(userData: string) {
    const userInfo = await this.api.getUserId(userData);
    store.set('selectedUser', userInfo);
  }
}

export default new UserController();
