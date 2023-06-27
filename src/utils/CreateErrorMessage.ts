export function createErrorMessage(inputTarget: any, errMessage: string) {
  let size = inputTarget.getBoundingClientRect();
  let err = document.getElementById('error');

  err!.style.display = 'block';
  err!.style.position = 'absolute';
  err!.style.top = `${size.top + 15}px`;
  err!.style.left = `${size.left + size.width + 15}px`;
  err!.innerText = errMessage;
}
