import initState from "../initState";
import { ADD_TARGET_INFO, INITIAL_UPDATE } from "../types/foodTypes";

const profileReducer = (state = {}, action) => {
  console.log(state);
  switch (action.type) {
    case ADD_TARGET_INFO:
      return action.payload;
    case INITIAL_UPDATE:
      return {
        ...state,
        targetWeight: action.payload.targetWeigth,
        targetKcal: action.payload.kcal,
        targetProteins: action.payload.Proteins,
        targetCarbs: action.payload.carbohydrates,
        targetFats: action.payload.fats,
      };
    default:
      return state;
  }
};

export default profileReducer;
