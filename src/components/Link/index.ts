import Block from '../../utils/Block';
import { withRouter } from '../../utils/hocks';
import template from './link.hbs';

interface ILinkProps {
  to: string;
  label: string;
  events?: {
    click: (event: MouseEvent) => void;
  };
}

class BaseLink extends Block {
  constructor(props: ILinkProps) {
    super({
      ...props,
      events: {
        click: (event: { preventDefault: () => void; }) => {
          event.preventDefault();
          this.navigate();
        },
      },
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export const Link = withRouter(BaseLink);
