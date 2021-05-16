import * as TYPES from "../types/types";

export const signIn = (userId) => {
  return {
    type: TYPES.SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: TYPES.SIGN_OUT,
  };
};

export const addInfo = (userInfo) => {
  return {
    type: TYPES.ADD_INFO,
    payload: userInfo,
  };
};
