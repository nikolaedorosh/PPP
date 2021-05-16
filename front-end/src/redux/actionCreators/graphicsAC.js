

import {GET_USERS , GET_GRAP} from '../types/grafTypes'

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

export  {getUsersThunk,getGrapForOneDay}



