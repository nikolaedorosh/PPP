import initState from "../initState";
import { INITIAL_UPDATE, USER_DATA_CHANGE } from "../types/foodTypes";

const infoReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DATA_CHANGE:
      return {
        ...state,
        age: action.payload.age,
        gender: action.payload.gender,
        weight: action.payload.weight,
        height: action.payload.height,
        activity: action.payload.activity,
        bmi: action.payload.bmi,
        targetWeight: action.payload.targetWeight,
        kcal: action.payload.kcal,
        Proteins: action.payload.Proteins,
        fats: action.payload.fats,
      };
    case INITIAL_UPDATE:
      return {
        ...state,
        age: action.payload.age,
        gender: action.payload.gender,
        weight: action.payload.weight,
        height: action.payload.height,
        activity: action.payload.activity,
        bmi: action.payload.bmi,
      };
    default:
      return state;
  }
};

export default infoReducer;
