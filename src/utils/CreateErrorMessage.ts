export function createErrorMessage(inputTarget: any, errMessage: string) {
  let err = document.getElementById('error');

  err!.style.display = 'block';
  err!.style.color = 'red';
  err!.style.fontSize = '14px';
  err!.style.width = '500px';
  err!.innerText = errMessage;
}
