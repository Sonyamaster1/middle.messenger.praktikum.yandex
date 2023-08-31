import { IUser } from '../api/AuthApi/AuthApi.interfaces';
import Block from './Block';
import EventBus from './EventBus';
import { set } from './helpers';
import { isEqual } from './isEqual';


export interface State {
  user?: IUser;
}

enum StorageEventE {
  UpdateState = 'update',
}

class Store extends EventBus {
  private state: State = {};

  getState() {
    return this.state;
  }

  set(path: string, value: unknown) {
    set(this.state, path, value);

    console.log(this.state);

    this.emit(StorageEventE.UpdateState, this.state);
  }
}

const store = new Store();

export const withStore =
    (
      mapStateToProps: (state: State) => Record<string, unknown>,
    ) =>
      (Component: typeof Block) => {
        let state: State;
        return class extends Component {
          constructor(props: any) {
            state = mapStateToProps(store.getState());
            super({ ...props, ...state });
            store.on(StorageEventE.UpdateState, () => {
              console.log('store on');
              const newState = mapStateToProps(store.getState());
              if (!isEqual(state, newState)) {
                this.setProps({ ...newState });
                state = newState;
              }
            });
          }
        };
      };
export default store;
