export function getFormData(formId: string): void {
  const formData = new FormData(document.getElementById(formId) as HTMLFormElement);
  let authFormData: object = {};
  for (let [key, value] of formData.entries()) {
    authFormData[key] = value;
  }
  console.log(authFormData);
}
