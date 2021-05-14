import { GET_USERS } from "../types/grafTypes";
import { ADD_TARGET_INFO } from "../types/foodTypes";

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
  console.log(respondUsers, "<---------------respondUsers");
  dispatch(getUsers(respondUsers));
};

function getUsers(users) {
  console.log(users, "<--------users");
  return {
    type: GET_USERS,
    payload: users,
  };
}
export const addTarget = (value) => {
  console.log("----->>", value);
};
// export const addTarget = (incomingWeight) => (dispatch) => {
//   console.log(incomingWeight);
//   const targetProteins = incomingWeight * 4 * 1.5;
//   const targetCarbs = incomingWeight * 9;
//   const targetFats = incomingWeight * 4 * 1.5;
//   const targetKcal = targetProteins + targetCarbs + targetFats;

//   console.log(targetKcal, targetProteins, targetCarbs, targetFats);
//   dispatch(
//     addMacroInfo({
//       targetKcal,
//       targetFats,
//       targetCarbs,
//       targetProteins,
//       targetWeight: incomingWeight,
//     })
//   );
// };

export const addMacroInfo = (props) => {
  return {
    type: ADD_TARGET_INFO,
    payload: props,
  };
};

export { getUsersThunk };
