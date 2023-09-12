import { API } from '../api';
import { ISignInData, ISignUpData } from './AuthApi.interfaces';

export default class AuthApi extends API {

  constructor() {
    super('/auth');
  }

  signUp(data: ISignUpData): Promise<unknown> {
    return this.http.post('/signup', data);
  }

  signIn(data: ISignInData): Promise<unknown> {
    console.log(data);
    return this.http.post('/signin', data);
  }

  logout(): Promise<unknown> {
    return this.http.post('/logout');
  }

  getUser(): Promise<unknown> {
    return this.http.get('/user');
  }
}
