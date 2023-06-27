import { validation } from '../../constants/validation';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Block from '../../utils/Block';
import { createErrorMessage } from '../../utils/CreateErrorMessage';
import { getFormData } from '../../utils/getFormData';
import template from './registry.hbs';
import * as styles from './registry.module.scss';


interface IRegistryProps {
  className: string;
}

export default class RegistryPage extends Block {
  constructor(props: IRegistryProps) {
    super({ props });
  }

  protected initChildren(): void {
    this.children.enterbtn = new Button({
      text: 'Enter',
      class: 'btn',
      events: {
        click: (e) => {
          e.preventDefault();
          getFormData('registry-form');
          location.href = '/pages/User/user.html';
        },
      },
    });

    this.children.toauthbtn = new Button({
      text: 'Sign In',
      class: 'sign-up-link',
      events: {
        click: (e) => {
          e.preventDefault();
          getFormData('registry-form');
          location.href = '/pages/Error5/error5.html';
        },
      },
    });

    this.children.emailinput = new Input({
      name: 'email',
      placeholder: 'Email',
      type: 'email',
      class: 'input',
      events: {
        blur: (e: any) => {
          let reg = validation.email.regExp;
          if (!reg.test(e.target.value)) {
            createErrorMessage(e.target, validation.email.message);
          }
        },
        focus: () => {
          let err = document.getElementById('error');
          err!.style.display = 'none';
          err!.innerText = '';
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

    this.children.first_nameinput = new Input({
      name: 'first_name',
      placeholder: 'First Name',
      type: 'text',
      class: 'input',
      events: {
        blur: (e: any) => {
          let reg = validation.first_name.regExp;
          if (!reg.test(e.target.value)) {
            createErrorMessage(e.target, validation.first_name.message);
          }
        },
        focus: () => {
          let err = document.getElementById('error');
          err!.style.display = 'none';
          err!.innerText = '';
        },
      },
    });

    this.children.second_nameinput = new Input({
      name: 'second_name',
      placeholder: 'Second Name',
      type: 'text',
      class: 'input',
      events: {
        blur: (e: any) => {
          let reg = validation.second_name.regExp;
          if (!reg.test(e.target.value)) {
            createErrorMessage(e.target, validation.second_name.message);
          }
        },
        focus: () => {
          let err = document.getElementById('error');
          err!.style.display = 'none';
          err!.innerText = '';
        },
      },
    });

    this.children.phoneinput = new Input({
      name: 'phone',
      placeholder: 'Phone',
      type: 'tel',
      class: 'input',
      events: {
        blur: (e: any) => {
          let reg = validation.phone.regExp;
          if (!reg.test(e.target.value)) {
            createErrorMessage(e.target, validation.phone.message);
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
