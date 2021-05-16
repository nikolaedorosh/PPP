import {GET_USERS,GET_GRAP } from '../types/grafTypes';

const graphicsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      console.log('тут я последний')
      return action.payload;
    case GET_GRAP:
      return action.payload;
    default:
      return state;
  }
};

export default graphicsReducer;

