import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from './vite-plugin-handlebars-precompile';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        auth: resolve(__dirname, 'src/pages/Auth/auth.hbs'),
        register: resolve(__dirname, 'src/pages/Registry/registry.html'),
        chats: resolve(__dirname,  'src/pages/Chats/chats.html'),
        user: resolve(__dirname,  'src/pages/User/user.html'),
        error404: resolve(__dirname,  'src/pages/Error404/error404.html'),
        error5: resolve(__dirname,  'src/pages/Error5/error5.html'),
      },
    },
  },
  plugins: [handlebars()],
  server: {
    port: 3000,
  },
});
