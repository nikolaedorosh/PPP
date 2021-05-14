import React from 'react'


function Item({id, Kcals, proteins, fats, carbs}) {


  return (
    <div>
   {Kcals}/{proteins}/{fats}/{carbs}
      <button color="danger">Delete</button>
      </div>
  );
}

export default Item;
