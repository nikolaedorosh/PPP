

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
  const requestUsers = await fetch("http://localhost:8080/logger")
  const respondUsers = await requestUsers.json();
  console.log(respondUsers, '<---------------respondUsers')
  dispatch(getUsers(respondUsers));
  };


function getUsers(users) {
  console.log(users, '<--------users')
  return {
    type: GET_USERS,
    payload: users,
  };
}


export  {getUsersThunk}



