import { renderDom } from '../../utils/renderDom';
import Error5Page from './error5';

document.addEventListener('DOMContentLoaded', () => {
  const error5Page = new Error5Page({ className: 'error5' });
  renderDom('#error5', error5Page);
});
