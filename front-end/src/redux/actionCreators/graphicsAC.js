

import {GET_USERS} from '../types/grafTypes'

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
  const requestUsers = await fetch("http://localhost:3000/logger")
  const respondUsers = await requestUsers.json();
  dispatch(getUsers(respondUsers));
  };


function getUsers(users) {
  return {
    type: GET_USERS,
    payload: users,
  };
}


export  {getUsersThunk}



