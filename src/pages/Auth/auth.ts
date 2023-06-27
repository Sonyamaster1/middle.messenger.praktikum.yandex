import template from './auth.hbs';
import { validation } from '../../constants/validation';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Block from '../../utils/Block';
import { createErrorMessage } from '../../utils/CreateErrorMessage';
import { getFormData } from '../../utils/getFormData';
import * as styles from './auth.module.scss';


interface IAuthProps {
  className: string;
}

export default class AuthPage extends Block {
  constructor(props: IAuthProps) {
    super({ props });
  }

  protected initChildren(): void {
    this.children.enterbtn = new Button({
      text: 'Enter',
      class: 'btn',
      events: {
        click: (e) => {
          e.preventDefault();
          getFormData('auth-form');
          location.href = '/pages/Chats/chats.html';
        },
      },
    });

    this.children.toregistrybtn = new Button({
      text: 'Sign Up',
      class: 'sign-in-link',
      events: {
        click: () => {
          location.href = '/pages/Registry/registry.html';
        },
      },
    });

    this.children.logininput = new Input({
      name: 'login',
      placeholder: 'Login',
      type: 'text',
      class: 'input',
      events: {
        blur: (e: any) => {
          let reg = validation.login.regExp;
          if (!reg.test(e.target.value)) {
            createErrorMessage(e.target, validation.login.message);
          }
        },
        focus: () => {
          let err = document.getElementById('error');
          err!.style.display = 'none';
          err!.innerText = '';
        },
      },
    });

    this.children.passwordinput = new Input({
      name: 'password',
      placeholder: 'Password',
      type: 'password',
      class: 'input',
      events: {
        blur: (e: any) => {
          let reg = validation.password.regExp;
          if (!reg.test(e.target.value)) {
            createErrorMessage(e.target, validation.password.message);
          }
        },
        focus: () => {
          let err = document.getElementById('error');
          err!.style.display = 'none';
          err!.innerText = '';
        },
      },
    });
  }

  render() {
    return this.compile(template, { styles });
  }
}
