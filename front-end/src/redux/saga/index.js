import { takeLatest, put, call, takeEvery, debounce } from "redux-saga/effects";
import { changeOptions } from "../actionCreators/mealAC";
import { CHANGE_OPTIONS_SAGA } from "../types/foodTypes";

async function fetchAddMeal (text) {
  if (text) {
    return await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${text}&api_key=pA7oxG3VbA0Inm6fJ5FM9dinnurffpJgq8U5aEoK`)
    .then(resp => resp.json())
    .then(res => {
      let arr = []
      let myFood = []
      if (res) {
        res.foods.map(el => {
          if (arr.indexOf(el.score) === -1) {
            arr.push(el.score)
            myFood.push(el)
          }
        })
      }
      return myFood
    })
  }
}

function changeTextSaga(payload) {
  return { type: CHANGE_OPTIONS_SAGA, payload: payload}
}

function* workerAddMealLoad({payload}) { 
  const options = yield call(fetchAddMeal, payload);
  yield put(changeOptions(options));
}

export default function* watchAddLoad() {
  yield debounce(1000, CHANGE_OPTIONS_SAGA, workerAddMealLoad)
}

export {changeTextSaga}
