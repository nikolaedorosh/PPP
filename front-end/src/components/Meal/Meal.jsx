import React from 'react'
import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { DELETE_MEAL } from '../../redux/types/foodTypes';


function Meal({ date, totalKcal, totalProteins, totalCarbohydrates, totalFats}) {

  const dispatch = useDispatch();

  function deleteClickHandler(date) {
    dispatch({
      type: DELETE_MEAL,
      payload: date
    })
 }

  return (
    <div>
      date: {date}
   {totalKcal}/{totalProteins}/{totalFats}/{totalCarbohydrates}
      <Button onClick={() => deleteClickHandler(date)} color="danger">Delete</Button>
      </div>
  );
}

export default Meal;
