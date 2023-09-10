import UserApi from '../api/UserApi';
import store from '../utils/Store';

class UserController {
  api: any;

  constructor() {
    this.api = new UserApi();
  }

  async putUserInfo(userData: string) {
    try {
      await this.api.putUserInfo(userData);
    } catch (err) {
      console.log(err);
    }
  }

  async putUserAvatar(userData: FormData) {
    try {
      const newUser = await this.api.putUserAvatar(userData);
      store.set('user', newUser);
    } catch (err) {
      console.log(err);
    }
  }

  async putPassword(userData: string) {
    try {
      await this.api.putPassword(userData);
    } catch (err) {
      console.log(err);
    }
  }

  async getUserId(userData: string) {
    try {
      const userInfo = await this.api.getUserId(userData);
      store.set('selectedUser', userInfo);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new UserController();
