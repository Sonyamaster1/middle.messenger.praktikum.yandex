import Block from './Block';

export function renderDom(selector: string, component: Block) {
  const root = document.querySelector(selector) as HTMLElement;
  if (!root) {
    throw new Error('Root not found');
  }

  console.log(component.getContent());
  root.innerHTML = '';
  root.appendChild(component.getContent());
}
