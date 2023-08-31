import EventBus from './EventBus';
import { nanoid } from 'nanoid';
import { Props } from '../types';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FLOW_CWU: 'flow:component-will-unmount',
  };

  public id = nanoid(6);

  private _element: HTMLElement | undefined;

  private tagName: string;

  _meta: { props: Props };

  protected props: Props;

  private eventBus: () => EventBus;

  protected children: Record<string, Block>;

  constructor(propsAndChildren: Props = {}, tagName: string = 'div') {
    this.tagName = tagName;
    const eventBus = new EventBus();
    const { props, children } = this.getChildren(propsAndChildren);
    this._meta = {
      props,
    };
    this.children = children;
    this.initChildren();
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this.unmountComponent.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  getChildren(propsAndChildren: Props) {
    const props: Props = {};
    const children: any = {};

    Object.entries(propsAndChildren).map(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every((val) => val instanceof Block)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { props, children };
  }


  private init(): void {
    this.createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }


  private createResources(): void {
    this._element = this._createDocumentElement(this.tagName);
  }

  public componentWillUnmount(): void { }


  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  private unmountComponent(): void {
    this.componentWillUnmount();
    this._removeEvents();

    this.element?.remove();
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(_oldProps: Props, _newProps: Props) {
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  public deleteElement(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CWU);
  }

  private _render() {
    this.unmountComponent();
    const fragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    if (this.element) {
      return this.element;
    }
  }

  private _makePropsProxy(props: Props) {
    const self = this;

    return new Proxy(props, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  show() {
    this.getContent()!.style.display = 'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }

  _addEvents() {
    const events: Record<string, () => void> = (this.props as Props).events;
    if (!events) {
      return;
    }
    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents(): void {
    const { events } = this.props;

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this.element?.addEventListener(eventName, events[eventName]);
      });
    }
  }

  compile(template: (context: any) => string, context: any) {
    const fragment = this._createDocumentElement(
      'template',
    ) as HTMLTemplateElement;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        context[key] = child.map(
          (ch) => `<div data-id="id-${ch.id}"></div>`,
        );

        return;
      }

      context[key] = `<div data-id="id-${child.id}"></div>`;
    });

    const htmlString = template(context);
    fragment.innerHTML = htmlString;



    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        context[key] = child.map((ch) => `<div data-id="id-${ch.id}"></div>`);
        return;
      }

      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

      if (!stub) {
        return;
      }

      stub.replaceWith(child.getContent()!);
    });

    return fragment.content;
  }

  protected initChildren() {}
}



// export default class Block {
//   static EVENTS = {
//     INIT: 'init',
//     FLOW_CDM: 'flow:component-did-mount',
//     FLOW_CDU: 'flow:component-did-update',
//     FLOW_RENDER: 'flow:render',
//   } as const;

//   public id = nanoid(6);

//   //   private _meta: { props: Props };

//   protected props: Props;

//   private tagName: string;

//   public children: Record<string, Block>;

//   private eventBus: () => EventBus;

//   private _element: HTMLElement | null = null;

//   /** JSDoc
//      * @param {string} tagName
//      * @param {Object} props
//      *
//      * @returns {void}
//      */
//   constructor(propsWithChildren: Props = {}, tagName: string = 'div') {
//     const eventBus = new EventBus();
//     this.tagName = tagName;

//     const { props, children } = this._getChildrenAndProps(propsWithChildren);

//     this.children = children;
//     this.props = this._makePropsProxy(props);

//     this.eventBus = () => eventBus;

//     this._registerEvents(eventBus);

//     eventBus.emit(Block.EVENTS.INIT);
//   }

//   _getChildrenAndProps(propsAndChildren: Props) {
//     const props: Props = {};
//     const children: any = {};

//     Object.entries(propsAndChildren).map(([key, value]) => {
//       if (value instanceof Block) {
//         children[key] = value;
//       } else if (Array.isArray(value) && value.every((val) => val instanceof Block)) {
//         children[key] = value;
//       } else {
//         props[key] = value;
//       }
//     });

//     return { props, children };
//   }

//   _addEvents() {
//     const events: Record<string, () => void> = (this.props as Props).events;
//     if (!events) {
//       return;
//     }

//     Object.keys(events).forEach(eventName => {
//       this._element?.addEventListener(eventName, events[eventName]);
//     });
//   }

//   private _createDocumentElement(tagName: string): HTMLElement {
//     return document.createElement(tagName);
//   }

//   private createResources(): void {
//     this._element = this._createDocumentElement(this.tagName);
//   }

//   _registerEvents(eventBus: EventBus) {
//     eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
//     eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
//     //@ts-ignore
//     eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
//     eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
//   }

//   private _init(): void {
//     this.init();
//     this.createResources();
//     this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
//   }

//   protected init() {}

//   _componentDidMount() {
//     this.componentDidMount();
//   }

//   componentDidMount() {}

//   public dispatchComponentDidMount() {
//     this.eventBus().emit(Block.EVENTS.FLOW_CDM);

//     Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
//   }

//   private _componentDidUpdate() {
//     if (this.componentDidUpdate()) {
//       this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
//     }
//   }

//   protected componentDidUpdate() {
//     return true;
//   }

//   setProps = (nextProps: unknown) => {
//     if (!nextProps) {
//       return;
//     }

//     Object.assign(this.props, nextProps);
//   };

//   get element() {
//     return this._element;
//   }

//   private _render() {
//     const fragment = this.render();

//     const newElement = fragment.firstElementChild as HTMLElement;

//     if (this._element && newElement) {
//       this._element.replaceWith(newElement);
//     }

//     this._element = newElement;

//     this._addEvents();
//   }

//   //   protected compile(template: string, context: any) {
//   //     const contextAndStubs = { ...context };

//   //     Object.entries(this.children).forEach(([name, component]) => {
//   //       contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
//   //     });

//   //     const html = Handlebars.compile(template)(contextAndStubs);

//   //     const temp = document.createElement('template');

//   //     temp.innerHTML = html;

//   //     Object.entries(this.children).forEach(([_, component]) => {
//   //       const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

//   //       if (!stub) {
//   //         return;
//   //       }

//   //       component.getContent()?.append(...Array.from(stub.childNodes));

//   //       stub.replaceWith(component.getContent()!);
//   //     });

//   //     return temp.content;
//   //   }
//   compile(template: (context: any) => string, context: any) {
//     const fragment = this._createDocumentElement(
//       'template',
//     ) as HTMLTemplateElement;

//     Object.entries(this.children).forEach(([key, child]) => {
//       if (Array.isArray(child)) {
//         context[key] = child.map(
//           (ch) => `<div data-id="id-${ch.id}"></div>`,
//         );

//         return;
//       }

//       context[key] = `<div data-id="id-${child.id}"></div>`;
//     });

//     const htmlString = template(context);
//     fragment.innerHTML = htmlString;



//     Object.entries(this.children).forEach(([key, child]) => {
//       if (Array.isArray(child)) {
//         context[key] = child.map((ch) => `<div data-id="id-${ch.id}"></div>`);
//         return;
//       }

//       const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

//       if (!stub) {
//         return;
//       }

//       stub.replaceWith(child.getContent()!);
//     });

//     return fragment.content;
//   }

//   protected render(): DocumentFragment {
//     return new DocumentFragment();
//   }

//   getContent() {
//     return this.element;
//   }

//   _makePropsProxy(props: Props) {
//     // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
//     const self = this;

//     return new Proxy(props, {
//       get(target, prop: string) {
//         const value = target[prop];
//         return typeof value === 'function' ? value.bind(target) : value;
//       },
//       set(target, prop: string, value) {
//         const oldTarget = { ...target };

//         target[prop] = value;

//         // Запускаем обновление компоненты
//         // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
//         self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
//         return true;
//       },
//       deleteProperty() {
//         throw new Error('Нет доступа');
//       },
//     });
//   }
// }
