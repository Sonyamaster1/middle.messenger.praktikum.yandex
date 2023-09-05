import { IUser } from '../api/AuthApi/AuthApi.interfaces';
import { ChatInfo } from '../api/ChatsApi/ChatsApi.interfaces';
import { Message } from '../components/Message';
import Block from './Block';
import EventBus from './EventBus';
import { set } from './helpers';
import { isEqual } from './isEqual';


export interface IState {
  user?: IUser;
  chats?: ChatInfo[];
  messages?: Record<number, Message[]>;
  selectedChat?: number;
}

enum StorageEventE {
  UpdateState = 'update',
}

class Store extends EventBus {
  private state: IState = {
    chats: [],
  };

  set(path: string, value: unknown) {
    set(this.state, path, value);

    console.log(this.state);

    this.emit(StorageEventE.UpdateState, this.state);
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: IState) => Record<string, unknown>) {
  return function wrap(Component: typeof Block) {
    return class WithStore extends Component {

      constructor(props: any) {
        let previousState = mapStateToProps(store.getState());

        super({ ...props, ...previousState });

        store.on(StorageEventE.UpdateState, () => {
          console.log('store on');
          const newState = mapStateToProps(store.getState());
          if (!isEqual(previousState, newState)) {
            this.setProps({ ...newState });
            previousState = newState;
          }
        });

      }

    };

  };
}
export default store;
