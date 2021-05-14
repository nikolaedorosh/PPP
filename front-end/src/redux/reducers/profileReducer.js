import initState from "../initState";
import { ADD_TARGET_INFO } from "../types/foodTypes";

const profileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_TARGET_INFO:
      return payload;

    default:
      return state;
  }
};

export default profileReducer;
