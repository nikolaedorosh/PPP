import * as TYPES from "../types/types";

const getUsersThunk = () => async (dispatch, getState) => {
  const requestUsers = await fetch("http://localhost:3000/logger");
  const respondUsers = await requestUsers.json();
  dispatch(getUsers(respondUsers));
};

function getUsers(users) {
  return {
    type: TYPES.GET_USERS,
    payload: users,
  };
}

const getGrapForOneDay = () => async (dispatch, getState) => {
  const requestGraf = await fetch("http://localhost:3000/logger");
  const respondGraf = await requestGraf.json();
  console.log(respondGraf, "<---------------respondGraf");
  dispatch(getGrap(respondGraf));
};
function getGrap(grap) {
  console.log(grap, "<--------usergraps");
  return {
    type: TYPES.GET_GRAP,
    payload: grap,
  };
}

export { getUsersThunk, getGrapForOneDay };

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
    console.log(data);
    const response = await fetch(`http://localhost:3000/profileData/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const dbData = await response.json();

    // _id: req.body.id,
    dispatch(newUserData(dbData));
  };

//update user action
export const newUserData = (data) => {
  return {
    type: TYPES.USER_DATA_CHANGE,
    payload: data,
  };
};

//upload Img
//
export const newPicChange = (newPicture) => (dispatch) => {
  dispatch(newPic(newPicture.file.path));
};

export const newPic = (data) => {
  return { type: TYPES.PIC_UPLOAD, payload: data };
};
