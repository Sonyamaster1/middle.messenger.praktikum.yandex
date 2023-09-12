import Block from './Block';

export function render(block: Block | any) {
  const root = document.querySelector('#app');
  root!.innerHTML = '';
  root!.appendChild(block.getContent());
}
