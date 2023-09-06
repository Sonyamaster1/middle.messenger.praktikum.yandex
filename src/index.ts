import AuthController from './controllers/AuthController';
import ChatsController from './controllers/ChatsController';
import AuthPage from './pages/Auth/auth';
import ChatsPage from './pages/Chats/chats';
import Error404Page from './pages/Error404/error404';
import Error5Page from './pages/Error5/error5';
import RegistryPage from './pages/Registry/registry';
import { Profile } from './pages/User/user';
import router from './utils/router';

enum Routes {
  Index = '/',
  Register = '/signup',
  ProfilePage = '/profile',
  Message = '/messenger',
  Error5 = '/error5',
  Error404 = '*',
}

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.Index, AuthPage)
    .use(Routes.Register, RegistryPage)
    .use(Routes.Message, ChatsPage)
    .use(Routes.ProfilePage, Profile)
    .use(Routes.Error5, Error5Page)
    .use(Routes.Error404, Error404Page);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();
    await ChatsController.fetchChats();
    router.start();

    if (!isProtectedRoute) {
      router.go(Routes.ProfilePage);
    }
  } catch (e) {
    console.log(e, 'Here');
    router.start();

    if (isProtectedRoute) {
      router.go(Routes.Index);
    }
  }

});
