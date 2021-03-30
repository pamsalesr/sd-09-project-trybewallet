export const LOGIN_INFORMATION = 'LOGIN_INFORMATION';

export function saveLoginInformation(email, validation) {
  return {
    type: 'LOGIN_INFORMATION',
    email,
    validation,
  };
}
