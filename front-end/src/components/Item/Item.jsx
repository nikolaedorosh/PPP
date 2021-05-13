import { useState } from 'react';


function Item({text, id}) {


  return (
    <>
   {text}
      <button color="secondary">Done</button> 
      <button color="danger">Delete</button>
      </>
  );
}

export default Item;
