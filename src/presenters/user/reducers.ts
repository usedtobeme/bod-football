import * as actionTypes from "./actionTypes";

const initialState = {
  user: null
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user
      };
    case actionTypes.ERROR:
      return {
        ...state,
        errorMessage: action.message
      };
    default:
      return state;
  }
}
