import initState from "../initState";
import { ADD_TARGET_INFO } from "../types/foodTypes";

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TARGET_INFO:
      return {
        ...state,
        targetWeight: action.payload.targetWeight,
        targetKcal: action.payload.targetKcal,
        targetProteins: action.payload.targetProteins,
        targetCarbs: action.payload.targetCarbs,
        targetFats: action.payload.targetFats,
      };

    default:
      return state;
  }
};

export default profileReducer;
