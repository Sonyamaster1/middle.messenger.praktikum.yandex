import { renderDom } from '../../utils/renderDom';
import Error404Page from './error404';

document.addEventListener('DOMContentLoaded', () => {
  const error404Page = new Error404Page({ className: 'error404' });
  renderDom('#error404', error404Page);
});
