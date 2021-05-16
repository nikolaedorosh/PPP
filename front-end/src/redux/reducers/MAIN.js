import * as TYPES from "../types/types";

const mainReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.USER_DATA_CHANGE:
      return {
        ...state,
        info: action.payload,
      };
    case TYPES.CHANGE_OPTIONS:
      return {
        ...state,
        food: { options: action.payload },
      };
    case TYPES.ADD_MEAL:
      return {
        ...state,
        food: { meals: [...state.meals, action.payload] },
      };
    case TYPES.DELETE_MEAL:
      return {
        ...state,
        food: {
          meals: state.meals.filter((el) => el.date !== action.payload),
        },
      };
    case TYPES.GET_USERS:
      return action.payload;
    default:
      return state;
  }
};

export default mainReducer;
