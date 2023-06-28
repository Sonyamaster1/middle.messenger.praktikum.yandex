import Button from '../../components/Button';
import Input from '../../components/Input';
import { validation } from '../../constants/validation';
import Block from '../../utils/Block';
import { createErrorMessage } from '../../utils/CreateErrorMessage';
import { getFormData } from '../../utils/getFormData';
import * as styles from '../../../style.scss';
import template from './user.hbs';


interface IUserProps {
  className: string;
}

export default class UserPage extends Block {
  constructor(props: IUserProps) {
    super({ props });
  }

  protected initChildren(): void {

    this.children.buttonavatar = new Button({
      text: 'Change Avatar',
      class: 'avatar-btn',
      type: 'submit',
      link: '',
      events: {
        click: (e) => {
          e.preventDefault();
          getFormData('avatar-form');
        },
      },
    });

    this.children.button = new Button({
      text: 'Enter',
      type: 'submit',
      class: 'enter-btn',
      link: '',
      events: {
        click: (e) => {
          e.preventDefault();
          location.href = '/pages/Chats/chats.html';
        },
      },
    });

    this.children.buttonchangepass = new Button({
      text: 'Change Password',
      class: 'password-btn',
      type: 'submit',
      link: '../Chats/chats.html',
      events: {
        click: (e) => {
          e.preventDefault();
          const formData = getFormData('password-form');
          let oldPasswordReg = validation.password.regExp;
          if (!oldPasswordReg.test(formData.oldPassword)) {
            return createErrorMessage(formData.oldPassword, validation.password.message);
          }
          let newPasswordReg = validation.password.regExp;
          console.log(formData.NewPassword);
          if (!newPasswordReg.test(formData.NewPassword)) {
            return createErrorMessage(formData.oldPassword, validation.password.message);
          }
          location.href = '/pages/Chats/chats.html';
        },
      },
    });

    this.children.enterbutton = new Button({
      text: 'Registration',
      class: 'registry-btn',
      type: 'submit',
      link: '',
      events: {
        click: (e) => {
          e.preventDefault();
          const formData = getFormData('registry-form');
          let emailReg = validation.email.regExp;
          if (!emailReg.test(formData.inputemail)) {
            return createErrorMessage(formData.inputemail, validation.email.message);
          }
          let loginReg = validation.login.regExp;
          if (!loginReg.test(formData.inputlogin)) {
            return createErrorMessage(formData.inputlogin, validation.login.message);
          }
          let firstReg = validation.first_name.regExp;
          if (!firstReg.test(formData.inputfirst_name)) {
            return createErrorMessage(formData.inputfirst_name, validation.first_name.message);
          }
          let secondReg = validation.second_name.regExp;
          if (!secondReg.test(formData.inputsecond_name)) {
            return createErrorMessage(formData.inputsecond_name, validation.second_name.message);
          }
          let phoneReg = validation.phone.regExp;
          if (!phoneReg.test(formData.inputphone)) {
            return createErrorMessage(formData.inputphone, validation.phone.message);
          }
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
