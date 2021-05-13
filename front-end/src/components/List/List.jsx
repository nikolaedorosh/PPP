import { useEffect, useState } from 'react';
import React from 'react'
import Item from '../Item/Item';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, Label, FormGroup } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {ADD_MEAL} from '../../redux/types/foodTypes'


function List() {

  const meal = useSelector(state => state.meal)
  const dispatch = useDispatch();

  const food = [meal]
  food.push(meal)  


  const [open, setOpen] = useState(false)
  const [scan, setScan] = useState(false)  
  const [text, setText] = useState("")  

  const [options, setOptions] = useState([])

  const [cal, setCal] = useState(0)  
  const [prot, setProt] = useState(0)  
  const [carb, setCarb] = useState(0)  
  const [fat, setFat] = useState(0)  


  function clickHandler() {
    setOpen(prev => !prev)
  }

  function tabClickHandler() {
    setScan(prev => !prev)
  }

  function changeMeal(e, i) {
    setText(e.target.value)
    if (text) {
      fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${text}&api_key=pA7oxG3VbA0Inm6fJ5FM9dinnurffpJgq8U5aEoK`)
      .then(resp => resp.json())
      .then(res => {
        console.log(res.foods)
        setOptions(res.foods)})
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [text]);


  function createMeal(e) {
    e.preventDefault()
    dispatch({
      type: ADD_MEAL,
      payload: {date: Date.now(), info: {cal, prot, carb, fat}}
    })
    setOpen(prev => !prev)
  }
  
  
  function addFoodHandler() {

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
                <FormGroup>
                <Input placeholder="search food" options={options} Input/>
                <Button onClick={addFoodHandler} type="button">Add item</Button>
              </FormGroup> 
              : "scan"}
            </ModalBody>
            <ModalFooter>
              <Button>Add Meal</Button>{' '}
              <Button type="button" onClick={clickHandler} color="danger">Cancel</Button>
            </ModalFooter>
          </Form>
      </Modal>
      <div>
        {food.length? food.map(el => 
        <Item key={Math.random()} id={el.id} name={el.name} cal={el.cal} fat={el.fat} carb={el.carb} prot={el.prot}/>
          ) : <> </>}
      </div>
    </>
  );
}

export default List;
