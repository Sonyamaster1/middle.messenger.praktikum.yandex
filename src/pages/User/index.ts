import { renderDom } from '../../utils/renderDom';
import UserPage from './user';

document.addEventListener('DOMContentLoaded', () => {
  const userPage = new UserPage({ className: 'user' });
  renderDom('#user', userPage);
});
