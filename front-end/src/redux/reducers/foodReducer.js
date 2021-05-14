import { DELETE_MEAL, ADD_MEAL } from "../types/foodTypes";
const foodReducer = (state = [], action) => {
  switch (action.type) {

    case ADD_MEAL:
      return [...state, action.payload]
    case DELETE_MEAL:
      return {
        state: state.filter(el => el.date !== action.payload)
      }
    default:
      return state;
  }
};

export default foodReducer;
