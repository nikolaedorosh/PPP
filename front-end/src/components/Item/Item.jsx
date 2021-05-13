import React from 'react'


function Item({id, Kcals, proteins, fats, carbs}) {


  return (
    <>
   {Kcals}/{proteins}/{fats}/{carbs}
      <button color="secondary">Done</button> 
      <button color="danger">Delete</button>
      </>
  );
}

export default Item;
