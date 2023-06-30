import AuthPage from './pages/Auth/auth';
import { renderDom } from './utils/renderDom';

document.addEventListener('DOMContentLoaded', () => {
  const authPage = new AuthPage({ className: 'auth' });
  renderDom('#app', authPage);
});
