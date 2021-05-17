import * as TYPES from "../types/types";
import * as AuthorizationAction from "../reducers/MAIN"; 


const getUsersThunk = (id) => async (dispatch, getState) => {
  const resp = await fetch("http://localhost:3000/logger", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id: id})
  })
  const res = await resp.json()
  dispatch(setWeek(res))
};

function setWeek(payload) {
  return {

  type: TYPES.SET_WEEK,
  payload: payload}
}

export { getUsersThunk };


// update user details
export const personalInfoHandler =
  ({
    age,
    gender,
    weight,
    height,
    activity,
    id,
    bmi,
    targetWeight,
    email,
    name,
  }) =>
  async (dispatch, getState) => {
    const Proteins = targetWeight * 4 * 1.5;
    const carbohydrates = targetWeight * 9;
    const fats = targetWeight * 4 * 1.5;
    const kcal = Proteins + carbohydrates + fats;

    const data = {
      name,
      email,
      id,
      age,
      gender,
      weight,
      height,
      activity,
      bmi,
      Proteins,
      carbohydrates,
      fats,
      kcal,
      targetWeight,
    };
    const response = await fetch(`http://localhost:3000/profileData/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const dbData = await response.json();
    dispatch(newUserData(dbData));
  };

//update user action
export const newUserData = (data) => {
  return {
    type: TYPES.USER_DATA_CHANGE,
    payload: data,
  };
};

