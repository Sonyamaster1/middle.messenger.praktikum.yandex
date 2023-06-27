export const validation = {
  login: {
    regExp: /^[a-zA-Z0-9_-]{3,20}$/,
    message: 'Допустимо от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
  },

  first_name: {
    regExp: /(^[А-ЯЁ]{1}[а-яё-]+)|(^[A-Z]{1}[a-z-]+)/u,
    message: 'Допустима только латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).',
  },

  second_name: {
    regExp: /(^[А-ЯЁ]{1}[а-яё-]+)|(^[A-Z]{1}[a-z-]+)/u,
    message: 'Допустима только латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).',
  },

  email: {
    regExp: /^[a-zA-Z0-9_-]+[@][a-zA-Z]+[.][a-zA-Z]+/,
    message: 'Допустима только латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
  },

  password: {
    regExp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    message: 'Допустимо только от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
  },

  phone: {
    regExp: /^([+]{1})?[0-9]{10,15}$/,
    message: 'Допустимо только от 10 до 15 символов, состоит из цифр, может начинается с плюса.',
  },

  message: {
    message: 'Поле не должно быть пустым',
  },
};
