import { API } from '../api';
import { IMyUserInt, IUserData, IUserPassword } from './UserApi.interfaces';

export default class UserApi extends API {

  constructor() {
    super('/user');
  }

  putUserInfo(data: IUserData): Promise<IMyUserInt | unknown> {
    return this.http.put('/profile', data);
  }

  async putUserAvatar(data: any): Promise<IMyUserInt | unknown> {
    return this.http.put('/profile/avatar', data, 'multipart/form-data').then((res) => {
      return res;
    });
  }

  putPassword(data: IUserPassword): Promise<string | unknown> {
    return this.http.put('/password', data);
  }
}