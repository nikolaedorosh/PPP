import { GET_USERS } from "../types/grafTypes";
import { ADD_TARGET_INFO, INITIAL_UPDATE } from "../types/foodTypes";

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

export const addTarget =
  ({ targetWeight, userEmail }) =>
  async (dispatch) => {
    const targetProteins = targetWeight * 4 * 1.5;
    const targetCarbs = targetWeight * 9;
    const targetFats = targetWeight * 4 * 1.5;
    const targetKcal = targetProteins + targetCarbs + targetFats;

    const sendTarget = await fetch(
      `http://localhost:3000/macroData/${userEmail}`,
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
    const receiveTarget = await sendTarget.status(200);

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
export const addMacroInfo = (props) => {
  return {
    type: ADD_TARGET_INFO,
    payload: props,
  };
};

export const profileUpdate = (firstDataAfterLogin) => (dispatch) => {
  dispatch(initialProfileDataUpdate(firstDataAfterLogin));
};

export const initialProfileDataUpdate = (props) => {
  return {
    type: INITIAL_UPDATE,
    payload: props,
  };
};

export { getUsersThunk };
