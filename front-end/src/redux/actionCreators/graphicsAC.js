
import { GET_USERS,GET_GRAP} from "../types/grafTypes";
import {
  ADD_TARGET_INFO,
  INITIAL_UPDATE,
  USER_DATA_CHANGE,
} from "../types/foodTypes";


// function changeStatusonKcal() {
//   return {
//     type: CHANGE_KCAL,
//   }
// }

// function changeAllStatus(){
//   return{
//     type:CHANGE_ALL_STATUS
//   }
// }


const getUsersThunk = () => async (dispatch, getState) => {

  const requestUsers = await fetch("http://localhost:3000/logger");
  const respondUsers = await requestUsers.json();
  dispatch(getUsers(respondUsers));
};

function getUsers(users) {
  return {
    type: GET_USERS,
    payload: users,
  };
}


const getGrapForOneDay = () => async (dispatch, getState) =>{
  const requestGraf = await fetch("http://localhost:3000/logger")
  const respondGraf = await requestGraf.json();
  console.log(respondGraf, '<---------------respondGraf')
  dispatch(getGrap(respondGraf));
}
function getGrap(grap) {
  console.log(grap, '<--------usergraps')
  return {
    type: GET_GRAP,
    payload: grap,
  };
}

export  {getUsersThunk, getGrapForOneDay}

//add target to back
export const addTarget =
  ({ targetWeight, userId }) =>
  async (dispatch) => {
    const targetProteins = targetWeight * 4 * 1.5;
    const targetCarbs = targetWeight * 9;
    const targetFats = targetWeight * 4 * 1.5;
    const targetKcal = targetProteins + targetCarbs + targetFats;

    const sendTarget = await fetch(
      `http://localhost:3000/macroData/${userId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Proteins: targetProteins,
          carbohydrates: targetCarbs,
          fats: targetFats,
          kcal: targetKcal,
          targetWeigth: targetWeight,
        }),
      }
    );
    const receiveTarget = await sendTarget.status;


    dispatch(
      addMacroInfo({
        targetKcal,
        targetFats,
        targetCarbs,
        targetProteins,
        targetWeight: targetWeight,
      })
    );
  };

//add target action
export const addMacroInfo = (props) => {
  return {
    type: ADD_TARGET_INFO,
    payload: props,
  };
};

//show db stats after logging
export const profileUpdate = (firstDataAfterLogin) => (dispatch) => {
  dispatch(initialProfileDataUpdate(firstDataAfterLogin));
};
export const initialProfileDataUpdate = (props) => {
  return {
    type: INITIAL_UPDATE,
    payload: props,
  };
};

// update user details
export const personalInfoHandler =
  ({ age, gender, weight, height, activity, id, bmi }) =>
  async (dispatch, getState) => {
    const data = {
      age,
      gender,
      weight,
      height,
      activity,
      bmi,
    };

    const response = await fetch(`http://localhost:3000/profileData/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const dbData = await response.json();

    dispatch(newUserData(data));
  };

//update user action
export const newUserData = (data) => {
  return {
    type: USER_DATA_CHANGE,
    payload: data,
  };
};
