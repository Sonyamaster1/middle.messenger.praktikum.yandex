import { validation } from '../../constants/validation';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Block from '../../utils/Block';
import { createErrorMessage } from '../../utils/CreateErrorMessage';
import { getFormData } from '../../utils/getFormData';
import template from './registry.hbs';
import * as styles from '../../../style.scss';
import AuthController from '../../controllers/AuthController';


interface IRegistryProps {
  className: string;
}

export default class RegistryPage extends Block {
  constructor(props: IRegistryProps) {
    super({ props });
  }

  protected initChildren(): void {
    this.children.registration = new Button({
      text: 'Registration',
      class: 'button',
      events: {
        // click: () => this.onSubmit(),
        click: (e) => {
          e.preventDefault();
          const formData = getFormData('registry-form');
          let emailReg = validation.email.regExp;
          if (!emailReg.test(formData.email)) {
            createErrorMessage(e.target, validation.email.message);
          }
          const loginRegExp = validation.login.regExp;
          if (!loginRegExp.test(formData.login)) {
            createErrorMessage(e.target, validation.login.message);
          }
          const firstRegExp = validation.first_name.regExp;
          if (!firstRegExp.test(formData.first_name)) {
            createErrorMessage(e.target, validation.first_name.message);
          }
          const secondRegExp = validation.second_name.regExp;
          if (!secondRegExp.test(formData.second_name)) {
            createErrorMessage(e.target, validation.second_name.message);
          }
          const phoneRegExp = validation.phone.regExp;
          if (!phoneRegExp.test(formData.phone)) {
            createErrorMessage(e.target, validation.phone.message);
          }
          const passwordRegExp = validation.password.regExp;
          if (!passwordRegExp.test(formData.password)) {
            return createErrorMessage(e.target, validation.password.message);
          }
          AuthController.signUp(formData);
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

  onSubmit() {
    const values = Object
      .values(this.children)
      .filter(child => child instanceof Input)
      .map((child) => ([(child as Input).getName(), (child as Input).getValue()]));

    const data = Object.fromEntries(values);

    console.log(data, 'signup data');

    AuthController.signUp(data);
  }

  render() {
    return this.compile(template, { styles });
  }
}
