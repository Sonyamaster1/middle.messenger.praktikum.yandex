export function getFormData(formId: string): any {
  const formData = new FormData(document.getElementById(formId) as HTMLFormElement);
  let authFormData: object | any = {};
  for (let [key, value] of formData.entries()) {
    authFormData[key] = value;
  }
  console.log(authFormData);
  return authFormData;
}
