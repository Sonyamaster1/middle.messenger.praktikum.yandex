import Block from './Block';

export function renderDom(selector: string, component: Block) {
  const root = document.querySelector(selector);
  if (!root) {
    throw new Error('Root not found');
  }
  console.log(component.getContent());
  console.log(component);
  root.innerHTML = '';
  root.appendChild(component.getContent());
}
