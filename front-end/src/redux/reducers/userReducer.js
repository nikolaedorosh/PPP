import initState from "../initState";
import {SIGN_IN, SIGN_OUT} from "../types/authTypes"

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

/// изменения!!!

