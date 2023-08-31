import Block from '../utils/Block';


function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';

  root.append(block.getContent()!);

  return root;
}

class Route {
  private block: Block | null = null;

  constructor(
    private pathname: string,
    private readonly blockClass: typeof Block,
    private readonly query: string) {
  }

  leave() {
    this.block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass({});

      render(this.query, this.block);
      return;
    }
  }
}

// class Route {
//   _pathname: any;

//   _blockClass: any;

//   _props: any;

//   _block: Block | any;

//   constructor(pathname: string, view: any, props: any) {
//     this._pathname = pathname;
//     this._blockClass = view;
//     this._block = null;
//     this._props = props;
//   }

//   navigate(pathname: string) {
//     if (this.match(pathname)) {
//       this._pathname = pathname;
//       this.render();
//     }
//   }

//   leave() {
//     if (this._block) {
//       this._block.hide();
//     }
//   }

//   match(pathname: string) {
//     return isEqual(pathname, this._pathname);
//   }

//   render() {
//     if (!this._block) {
//       this._block = new this._blockClass();
//       render(this._props.rootQuery, this._block);
//       return;
//     }

//     this._block.show();
//   }
// }

class Router {
  private static __instance: Router;

  private routes: Route[] = [];

  private currentRoute: Route | null = null;

  private history = window.history;

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];

    Router.__instance = this;
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, this.rootQuery);
    this.routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);

    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}

export default new Router('#app');
