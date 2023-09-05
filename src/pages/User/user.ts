import Button from '../../components/Button';
import Input from '../../components/Input';
import { validation } from '../../constants/validation';
import Block from '../../utils/Block';
import { createErrorMessage } from '../../utils/CreateErrorMessage';
import { getFormData } from '../../utils/getFormData';
import styles from './user.module.scss';
import template from './user.hbs';
import { AvatarInput } from '../../components/AvatarInput';
import UserController from '../../controllers/UserController';
import AuthController from '../../controllers/AuthController';
import { IState, withStore } from '../../utils/Store';

interface IUserProps {
  className: string;
}

export default class UserPage extends Block {
  constructor(props: IUserProps) {
    super(props);
    this.props = props;
  }

  protected initChildren(): void {
    this.children.button = new Button({
      text: 'Enter',
      class: 'button',
    });

    this.children.buttonavatar = new AvatarInput({
      events: {
        click: (e) => {
          e.preventDefault();
          const inputFile: HTMLInputElement | null = document.getElementById('avatar') as HTMLInputElement;
          const formData: FormData = new FormData();
          const file = inputFile.files ? inputFile.files[0] : 'nofile';
          formData.append('avatar', file);
          UserController.putUserAvatar(formData);
        },
      },
    });

    this.children.editbutton = new Button({
      text: 'Registration',
      class: 'button',
      events: {
        click: (e) => {
          e.preventDefault();
          let data = getFormData('settings-registry-form');
          UserController.putUserInfo(data);
        },
      },
    });

    this.children.buttonlogout = new Button({
      text: 'Logout',
      class: 'button',
      type: 'button',
      events: {
        click: () => { AuthController.logout(); },
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
            createErrorMessage(
              e.target,
              validation.first_name.message,
            );
          }
        },
        focus: () => {
          let err = document.getElementById('error');
          err!.style.display = 'none';
          err!.innerText = '';
        },
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

    this.children.inputsecond_name = new Input({
      name: 'second_name',
      placeholder: 'Second Name',
      type: 'text',
      class: 'input',
      events: {
        blur: (e: any) => {
          let reg = validation.second_name.regExp;
          if (!reg.test(e.target.value)) {
            createErrorMessage(
              e.target,
              validation.second_name.message,
            );
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

    this.children.buttonchangepass = new Button({
      text: 'Change password',
      class: 'button',
      events: {
        click: () => {
          this.onSubmit();
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
            createErrorMessage(
              e.target,
              validation.password.message,
            );
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
      name: 'newPassword',
      placeholder: 'New Password',
      type: 'password',
      class: 'input',
      events: {
        blur: (e: any) => {
          let reg = validation.password.regExp;
          if (!reg.test(e.target.value)) {
            createErrorMessage(
              e.target,
              validation.password.message,
            );
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

  componentDidMount(): void {
    AuthController.fetchUser();
  }

  onSubmit() {
    const values = Object
      .values(this.children)
      .filter(child => child instanceof Input)
      .map((child) => ([(child as Input).getName(), (child as Input).getValue()]));

    const data = Object.fromEntries(values);

    UserController.putPassword(data);
  }

  render() {
    return this.compile(template, {
      styles,
      props: {
        avatar: `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}`,
        isAvatar: this.props.avatar,
      },
    });
  }
}
function mapStateToProps(state: IState) {
  console.log(state);
  return { ...state.user };
}

export const Profile = withStore(mapStateToProps)(UserPage);
