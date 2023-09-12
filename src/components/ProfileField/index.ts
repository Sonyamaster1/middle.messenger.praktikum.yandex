import Block from '../../utils/Block';
import template from './profileField.hbs';

interface IProfileFieldProps {
  name: string;
  value: string | number;
}

export class ProfileField extends Block {
  constructor(props: IProfileFieldProps) {
    super(props);
    this.props = props;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
