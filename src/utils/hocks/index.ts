import Block from '../Block.ts';
import router from '../router.ts';

export function withRouter(Component: typeof Block) {

  return class extends Component {
    constructor(props: any) {
      super({ ...props, router });
    }
  };
}

export interface IPropsWithRouter {
  router: typeof router;
}
