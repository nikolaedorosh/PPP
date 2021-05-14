import { SIGN_IN, SIGN_OUT } from "../types/authTypes";

const authReducer = (state = [], action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userID: action.payload, //!!!!
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        userID: null,
      };
    default:
      return state;
  }
};

export default authReducer;


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

