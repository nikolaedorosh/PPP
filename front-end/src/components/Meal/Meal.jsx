import React from 'react'
import { Button } from 'reactstrap';
import {sendMeal} from '../../redux/actionCreators/mealAC'
import { useDispatch } from 'react-redux';

function Meal({ date, items}) {
  console.log(items , '<-------- items from meal')
  const dispatch = useDispatch();

  function deleteClickHandler(date) {
    dispatch(sendMeal(date))
 }

 let totalCarbohydrates = 0;
 let totalFats = 0;
 let totalKcal = 0;
 let totalProteins = 0;

 items.forEach(el => {
  totalCarbohydrates += el.info.carb
  totalFats += el.info.fat
  totalKcal += el.info.cal
  totalProteins += el.info.prot
 });
//  {items[0].name}...
  return (
    <Button>
         {items[0].name}...
       {totalKcal}/{totalProteins}/{totalFats}/{totalCarbohydrates}
      <Button onClick={() => deleteClickHandler(date)} color="danger">Delete</Button>
      </Button>
  );
}

export default Meal;
