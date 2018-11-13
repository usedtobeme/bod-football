import * as actionTypes from "./actionTypes";

export function syncUser() {
  return {
    type: actionTypes.SYNC_USER
  };
}

export function login(user) {
  return {
    type: actionTypes.LOGIN,
    user
  };
}

export function logout() {
  return {
    type: actionTypes.LOGOUT
  };
}

export function register(user) {
  return {
    type: actionTypes.REGISTER,
    user
  };
}

export function setUser(user) {
  return {
    type: actionTypes.SET_USER,
    user
  };
}
