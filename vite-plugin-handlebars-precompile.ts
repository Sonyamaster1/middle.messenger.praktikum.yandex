import { PluginOption } from 'vite';
import Handlebars from 'handlebars';

export default function handlebars(): PluginOption {
  const fileRexexp = /\.hbs$|\.handlebars$/;

  return {
    name: 'vite-plugin-handlebars-precompile',
    transform(src, id) {
      if (!fileRexexp.test(id)) {
        return;
      }
      
      const code = `
        import Handlebars from 'handlebars/runtime';
        export default Handlebars.template(${Handlebars.precompile(src)})
        `;

      return {
        code,
      };
    },
  };
}
