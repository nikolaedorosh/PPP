import { useState } from 'react';
import React from 'react'
import { useSelector, } from 'react-redux';
import Item from '../Item/Item';
import Modal from '../Modal/Modal';

function List() {

  const food = useSelector(state => state.food)

  const [open, setOpen] = useState(false)

  function clickHandler() {
    setOpen(prev => !prev)
  }

  return (
    <>
      <button onClick={clickHandler} color="secondary">Eat</button> 
      <Modal style={{display: open? "block" : "none"}}/>
      <div>
        {food && food.map(el => 
        <Item key={Math.random()} id={el.id} name={el.name} Kcals={el.Kcals} fats={el.fats} carbs={el.carbs} proteins={el.proteins}/>
          )}
      </div>
    </>
  );
}

export default List;
