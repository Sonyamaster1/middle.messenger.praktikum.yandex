import { renderDom } from '../../utils/renderDom';
import ChatsPage from './chats';

document.addEventListener('DOMContentLoaded', () => {
  const chatsPage = new ChatsPage({ className: 'chats' });

  renderDom('#chats', chatsPage);
});
