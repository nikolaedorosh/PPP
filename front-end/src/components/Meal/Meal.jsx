import React from 'react'
import { Button } from 'reactstrap';
import {sendMeal} from '../../redux/actionCreators/mealAC'
import { useDispatch } from 'react-redux';

function Meal({ date, itemNames, totalKcal, totalProteins, totalCarbohydrates, totalFats}) {

  const dispatch = useDispatch();

  function deleteClickHandler(date) {
    dispatch(sendMeal(date))
 }

  return (
    <div>
      <div>
        {itemNames.join(", ")}
      </div>
      <div>
       {totalKcal}/{totalProteins}/{totalFats}/{totalCarbohydrates}
      </div>
        date: {date}
      <Button onClick={() => deleteClickHandler(date)} color="danger">Delete</Button>
      </div>
  );
}

export default Meal;
