import Block from '../../utils/Block';
import template from './avatarInput.hbs';

interface InputAvatarProps {
  events?: {
    click?: (e: Event) => void;
  };
}

export class AvatarInput extends Block {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: InputAvatarProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
