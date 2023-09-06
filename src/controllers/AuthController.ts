import AuthApi from '../api/AuthApi';
import { ISignInData, ISignUpData } from '../api/AuthApi/AuthApi.interfaces';
import store from '../utils/Store';
import Router from '../utils/router';
import MessageController from './MessageController';

class AuthController {
  api: any;

  constructor() {
    this.api = new AuthApi();
  }

  async signUp(data: ISignUpData) {
    try {
      await this.api.signUp(data);

      Router.go('/profile');
    } catch (error) {
      console.log(error);
    }
  }

  async signIn(data: ISignInData) {
    try {
      await this.api.signIn(data);
      await this.fetchUser();

      Router.go('/messenger');
    } catch (error) {
      console.log(error);
    }
  }


  async logout() {
    try {

      await this.api.logout();
      MessageController.closeAll();

      Router.go('/');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.getUser();

      console.log('error');
      store.set('user', user);

    } catch (error) {
      throw error;
    }
  }
}

export default new AuthController();
