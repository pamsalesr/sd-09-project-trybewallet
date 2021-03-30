// Coloque aqui suas actions
export function userLogin(userEmail) {
  return { type: 'USERLOGIN', userEmail };
}

export function userAdd(newData) {
  return { type: 'ADDNEWUSER', newData };
}
