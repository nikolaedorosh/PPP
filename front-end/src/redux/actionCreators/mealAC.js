import {ADD_MEAL} from "../types/foodTypes";

import { CHANGE_OPTIONS } from "../types/foodTypes"

function addMeal(payload) {
  return { type: ADD_MEAL, payload: payload}
}

function changeOptions(payload) {
  return { type: CHANGE_OPTIONS, payload: payload}
}

export const getMeal = (meal) => async (dispatch, getState) => {
  const response = await fetch('http://localhost:3000/logger/createMeal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(meal)
        })
        .then(resp => resp.json())
    if (response) {
      const {date, info, itemNames, _id} = response;
      dispatch(addMeal({date, info, itemNames, id: _id}))
    }
}

export {changeOptions}
