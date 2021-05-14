import {GET_USERS } from '../types/grafTypes';

const graphicsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      console.log('тут я последний')
      return action.payload;
    // case CHANGE_KCAL:
    //   return { ...state, graphics: !state.graphics };
    // case CHANGE_ALL_STATUS:
    //   return action.payload;
    default:
      return state;
  }
};

export default graphicsReducer;

