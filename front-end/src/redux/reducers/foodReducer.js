import { DELETE_MEAL, ADD_MEAL, CHANGE_OPTIONS } from "../types/foodTypes";

const foodReducer = (state = [], action) => {
  switch (action.type) {
    case CHANGE_OPTIONS:
      return {
        ...state,
        options: action.payload
      }
    case ADD_MEAL:
      console.log()
      return {
        ...state,
        meals: [...state.meals, action.payload]
    }
    case DELETE_MEAL:
      return {
        ...state,
        meals: state.filter(el => el.date !== action.payload)
      }
    default:
      return state;
  }
};

export default foodReducer;
