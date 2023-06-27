import Button from '../../components/Button';
import Input from '../../components/Input';
import { validation } from '../../constants/validation';
import Block from '../../utils/Block';
import { createErrorMessage } from '../../utils/CreateErrorMessage';
import { getFormData } from '../../utils/getFormData';
import * as styles from './user.module.scss';
import template from './user.hbs';


interface IUserProps {
  className: string;
}

export default class UserPage extends Block {
  constructor(props: IUserProps) {
    super({ props });
  }

  protected initChildren(): void {
    this.children.enterbutton = new Button({
      text: 'Enter',
      class: 'btn',
    });

    this.children.buttonavatar = new Button({
      text: 'Change Avatar',
      class: 'avatar-btn',
      events: {
        click: (e) => {
          e.preventDefault();
          getFormData('avatar-form');
        },
      },
    });

    this.children.buttonchangepass = new Button({
      text: 'Change Password',
      class: 'password-btn',
      events: {
        click: (e) => {
          e.preventDefault();
          getFormData('password-form');
          location.href = '/pages/Chats/chats.html';
        },
      },
    });

    this.children.enterbutton = new Button({
      text: 'Registration',
      class: 'registry-btn',
      events: {
        click: (e) => {
          e.preventDefault();
          getFormData('registry-form');
        },
      },
    });

    this.children.inputavatar = new Input({
      name: 'avatar',
      placeholder: 'Avatar',
      type: 'file',
      class: 'input',
      events: {
        blur: () => {},
        focus: () => {},
      },
    });

    this.children.inputemail = new Input({
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

    this.children.inputlogin = new Input({
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

    this.children.inputfirst_name = new Input({
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

    this.children.inputsecond_name = new Input({
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

    this.children.inputdisplay_name = new Input({
      name: 'display_name',
      placeholder: 'Display Name',
      type: 'text',
      class: 'input',
      events: {
        blur: () => {},
        focus: () => {},
      },
    });

    this.children.inputphone = new Input({
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

    this.children.inputoldpass = new Input({
      name: 'oldPassword',
      placeholder: 'Old Password',
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

    this.children.inputnewpass = new Input({
      name: 'NewPassword',
      placeholder: 'New Password',
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
