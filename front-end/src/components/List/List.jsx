import { useEffect, useState } from 'react';
import React from 'react'
import Item from '../Item/Item';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {ADD_MEAL} from '../../redux/types/foodTypes'


function List() {

  const meal = useSelector(state => state.meal)
  const dispatch = useDispatch();

  const food = [meal]
  food.push(meal)  


  const [open, setOpen] = useState(false)
  const [scan, setScan] = useState(false)  
  const [text, setText] = useState(false)  
  
  const [options, setOptions] = useState([])
  const [pseudoMeal, setPseudoMeal] = useState([])  
  
  function clickHandler() {
    setOpen(prev => !prev)
  }
  
  function tabClickHandler() {
    setScan(prev => !prev)
  }

  useEffect(() => {
    if (text) {
      fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${text}&api_key=pA7oxG3VbA0Inm6fJ5FM9dinnurffpJgq8U5aEoK`)
      .then(resp => resp.json())
      .then(res => {
        if (res) {
          let arr = []
          let myFood = []
          res.foods.map(el => {
            if (arr.indexOf(el.score) === -1) {
              arr.push(el.score)
              myFood.push(el)
            }
          })
          setOptions(myFood)
        }
      })
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
      setPseudoMeal(prev => [...prev, {info: {cal: myItem.foodNutrients[3].value, prot: myItem.foodNutrients[0].value, carb: myItem.foodNutrients[2].value, fat: myItem.foodNutrients[1].value}}])
      setText(false)
      setOptions([])
    }
  }
  
    
    function createMeal(e) {
      e.preventDefault()
      dispatch({
        type: ADD_MEAL,
        payload: {date: Date.now(), meal: pseudoMeal}
      })
      setOpen(prev => !prev)
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
                      <option key={Math.random()} value={`${el.lowercaseDescription}   score: ${el.score}`}/>
                    ): <></>}
                  </datalist>
              </FormGroup> 
              {pseudoMeal.length? 
                pseudoMeal.map(el => 
                  <Item id={el.id} Kcals={el.info.cal} proteins={el.info.prot} fats={el.info.fat} carbs={el.info.carb}/>
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
        <Item key={Math.random()} id={el.id} name={el.name} cal={el.cal} fat={el.fat} carb={el.carb} prot={el.prot}/>
          ) : <> </>}
      </div>
    </>
  );
}

export default List;
