import React from 'react'


function Meal({ id, date, totalKcal, totalProteins, totalCarbohydrates, totalFats}) {


  return (
    <div>
      date: {date}
   {totalKcal}/{totalProteins}/{totalFats}/{totalCarbohydrates}
      <button color="danger">Delete</button>
      </div>
  );
}

export default Meal;
