import { DELETE_MEAL, ADD_MEAL } from "../types/foodTypes";
const foodReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_MEAL:
      return {
        meal: action.payload
      }
    case DELETE_MEAL:
      return {
        meal: state.meal.filter(el => el.date !== action.payload)
      }
    default:
      return state;
  }
};

export default foodReducer;
