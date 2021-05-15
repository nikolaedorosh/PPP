import { useEffect, useState } from 'react';
import React from 'react'
import Item from '../Item/Item';
import Meal from '../Meal/Meal';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMeal } from '../../redux/actionCreators/mealAC';
import { changeTextSaga } from '../../redux/saga';
import { CHANGE_OPTIONS } from '../../redux/types/foodTypes';


function List() {

  const food = useSelector(state => state.food.meals)
  const options = useSelector(state => state.food.options)
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false)
  const [scan, setScan] = useState(false)  
  const [text, setText] = useState(false)  
  
  const [meal, setMeal] = useState([])  
  
  function clickHandler() {
    setOpen(prev => !prev)
  }
  
  function tabClickHandler() {
    setScan(prev => !prev)
  }

  useEffect(() => {
    if (text) {
      dispatch(changeTextSaga(text))
    }
  }, [text]);

  function changeText(e) {
    const textArr = e.target.value.split(' ')
    if (!textArr.includes("score:")) {
      setText(e.target.value)
    } else {
      const myItem = options.find(el => {
        return el.score === +textArr[textArr.length - 1]
      })
      setMeal(prev => [...prev, {name: myItem.name, info: {cal: myItem.info.cal, prot: myItem.info.prot, carb: myItem.info.carb, fat: myItem.info.fat}}])
      setText(false)
      dispatch({
        type: CHANGE_OPTIONS,
        payload: []
      })
    }
  }
    
    function createMeal(e) {
      e.preventDefault()
      dispatch(getMeal(meal))
      setOpen(prev => !prev)
      setMeal([])   
  }

  function deleteItem(name) {
    setMeal(prev => prev.filter(el => el.name !== name))
  }

  return (
    <>
      <Button color="danger" onClick={clickHandler}>Eat</Button>
      <Modal isOpen={open}>
          <Form onSubmit={createMeal} inline>
            <ModalHeader>
              meal 
              <div>
                <Button onClick={tabClickHandler} type="button">{scan? "Type": "Scan"}</Button>
              </div>
            </ModalHeader>
            <ModalBody>
              {!scan? 
                <>
                <FormGroup>
                <Input onChange={changeText} placeholder="search food" list="food" value={text? text: ""}></Input>
                  <datalist id="food">
                  {options.length? options.map(el => 
                      <option key={Math.random()} value={`${el.name}   score: ${el.score}`}/>
                    ): <></>}
                  </datalist>
              </FormGroup> 
              {Meal.length? 
                meal.map(el => 
                  <Item name={el.name} deleteItem={deleteItem} Kcals={el.info.cal} proteins={el.info.prot} fats={el.info.fat} carbs={el.info.carb}/>
                  ): <></>}
                  </>
                  : "scan"}
            </ModalBody>
            <ModalFooter>
            Kcals/proteins/fats/carbs
              <Button>Add Meal</Button>{' '}
              <Button type="button" onClick={clickHandler} color="danger">Cancel</Button>
            </ModalFooter>
          </Form>
      </Modal>
      <div>
        {food.length? food.map(el => 
        <Meal key={Math.random()} date={el.date} totalKcal={el.info.totalKcal} totalProteins={el.info.totalProteins} totalCarbohydrates={el.info.totalCarbohydrates} totalFats={el.info.totalFats}/>
          ) : <> </>}
      </div>
    </>
  );
}

export default List;
