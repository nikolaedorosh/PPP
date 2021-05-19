import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {sendMeal} from '../../redux/actionCreators/mealAC'
import { useDispatch, useSelector } from 'react-redux';
import Item from '../Item/Item';

function Meal({ date, items, id}) {
  console.log(id, "my id")
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  
  
  const myDate = new Date(date)
  const dateStr = `${myDate.toLocaleDateString('en-US')} at ${myDate.toLocaleTimeString(['it-IT'], { hour: '2-digit', minute: '2-digit' })}`


  function deleteClickHandler(id) {
    dispatch(sendMeal(id))
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

totalCarbohydrates = totalCarbohydrates.toFixed(2)
totalFats = totalFats.toFixed(2)
totalKcal = totalKcal.toFixed(2)
totalProteins = totalProteins.toFixed(2)


  return (
    <>
    <Button onClick={clickHandler}>
        {items[0].name}...
       {totalKcal}/{totalProteins}/{totalFats}/{totalCarbohydrates}
      <Button onClick={() => deleteClickHandler(id)} color="danger">Delete</Button>
      </Button>
      <Modal toggle={clickHandler} isOpen={open}>
        <ModalHeader>
          {dateStr}
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
