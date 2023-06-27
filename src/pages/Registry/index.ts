import { renderDom } from '../../utils/renderDom';
import RegistryPage from './registry';

document.addEventListener('DOMContentLoaded', () => {
  const registryPage = new RegistryPage({ className: 'registry' });

  renderDom('#registry', registryPage);
});
