import Block from './Block';

export function renderDom(selector: string, component: Block | any) {
  const root = document.querySelector(selector) as HTMLElement;
  if (!root) {
    throw new Error('Root not found');
  }

  root.innerHTML = '';
  root.appendChild(component.getContent());
}
