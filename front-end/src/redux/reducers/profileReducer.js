import * as TYPES from "../types/authTypes";
import initState from "../initState";

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES:
      return {
        ...state,
      };
    case TYPES:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default profileReducer;
