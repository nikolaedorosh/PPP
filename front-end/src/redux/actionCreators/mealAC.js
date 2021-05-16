import {ADD_MEAL} from "../types/foodTypes";
import { CHANGE_OPTIONS, DELETE_MEAL } from "../types/foodTypes"

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
      const {date, items} = response;
      dispatch(addMeal({date, items}))
    }
}

function deleteMeal(payload) {
  return { type: DELETE_MEAL, payload: payload}
}

export const sendMeal = (date) => async (dispatch, getState) => {
  const response = await fetch('http://localhost:3000/logger/deleteMeal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({date: date})
        })
    if (response.status === 200) {
      dispatch(deleteMeal(date))
    }
}

export {changeOptions}
