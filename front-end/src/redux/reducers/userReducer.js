import {SIGN_IN, SIGN_OUT, ADD_INFO} from "../types/authTypes"
import initState from "../initState"
// начало

export default (state = [], action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, 
        isSignedIn: true, userId: action.payload
      };
        // ...action.payload };
    case SIGN_OUT:
      return { ...state,
        isSignedIn: false, userId: null 
      
      };
      case ADD_INFO:
        return { ...state, 
          userName: action.payload.userName, userEmail: action.payload.userEmail
          
        };
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

export const addInfo = (userInfo) => {
  return {
    type: ADD_INFO,
    payload: userInfo
  }
}


