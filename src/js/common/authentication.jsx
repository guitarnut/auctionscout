export function saveAuth(username, password, account) {
  window.localStorage.setItem('auth_bs', 'Basic ' + btoa(username + ':' + password));
  window.localStorage.setItem('auth_bs_id', account);
}

export function getAuth() {
  return window.localStorage.getItem('auth_bs');
}

export function getAccount() {
  return window.localStorage.getItem('auth_bs_id');
}

export function deleteAuth() {
  window.localStorage.removeItem('auth_bs');
  window.localStorage.removeItem('auth_bs_id');
}

export function isAuthorized() {
  return window.localStorage.getItem('auth_bs') !== null;
}
