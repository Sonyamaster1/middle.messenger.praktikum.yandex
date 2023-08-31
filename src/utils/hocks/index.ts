import Block from '../Block';
import router from '../router';

export function withRouter(Component: typeof Block) {

  return class extends Component {
    constructor(props: any) {
      super({ ...props, router });
    }
  };
}

export interface PropsWithRouter {
  router: typeof router;
}
