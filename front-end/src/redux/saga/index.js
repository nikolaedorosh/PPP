import { put, call, debounce } from "redux-saga/effects";
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
            let prot = 0;
            let cal = 0;
            let carb = 0;
            let fat = 0;
            el.foodNutrients.forEach(nutrient => {
              switch (nutrient.nutrientId) {
                case 1003:
                  prot = nutrient.value
                  break;
                case 1004:
                  fat = nutrient.value
                  break;
                case 1008:
                  cal = nutrient.value
                  break;
                case 1005:
                  carb = nutrient.value
                  break;
              
                default: 
                  break;
              }
            })
            myFood.push({name: el.lowercaseDescription, score: el.score, info: {cal, prot, carb, fat}})
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
