import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {sendMeal} from '../../redux/actionCreators/mealAC'
import { useDispatch } from 'react-redux';
import Item from '../Item/Item';

function Meal({ date, items}) {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)

  function deleteClickHandler(date) {
    dispatch(sendMeal(date))
 }

 function clickHandler() {
  setOpen(prev => !prev)
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

  return (
    <>
    <Button onClick={clickHandler}>
        {items[0].name}...
       {totalKcal}/{totalProteins}/{totalFats}/{totalCarbohydrates}
      <Button onClick={() => deleteClickHandler(date)} color="danger">Delete</Button>
      </Button>
      <Modal toggle={clickHandler} isOpen={open}>
        <ModalHeader>
          {date}
        </ModalHeader>
        <ModalBody>
          {items.map(el => 
            <Item image={el.image} Kcals={el.info.cal} proteins={el.info.prot} fats={el.info.fat} carbs={el.info.carb}/>
            )}
          <ModalFooter>
            <Button onClick={clickHandler}>Cancel</Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
      </>
  );
}

export default Meal;
