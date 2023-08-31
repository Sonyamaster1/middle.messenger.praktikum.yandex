import Block from './Block';

export function render(block: Block) {
  const root = document.querySelector('#app');
  root!.innerHTML = '';
  root!.appendChild(block.getContent());
}
