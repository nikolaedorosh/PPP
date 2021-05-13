import { useState } from 'react';
import React from 'react'
import Item from '../Item/Item';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form } from 'reactstrap';


function List() {

  // const food = useSelector(state => state.food)

  const food = []
  const [open, setOpen] = useState(false)
  const [cal, setCal] = useState(null)
  const [prot, setProt] = useState(null)
  const [fat, setFat] = useState(null)
  const [carb, setCarb] = useState(null)


  function clickHandler() {
    setOpen(prev => !prev)
  }

  function changeInputHandler (e) {
    const input = e.target.value
    switch (e.target.value.className.split(' ')[0]) {
      case "calories":
        setCal(input)
        break;
      case "proteins":
        setProt(input)
        break;
      case "fats":
        setFat(input)
        break;
      case "carbs":
        setCarb(input)
        break;
      default:
        break;
    }
  }

  function createFood(e) {
    e.preventDefault()
    setOpen(prev => !prev)
  }

  return (
    <>
      <Button color="danger" onClick={clickHandler}>Eat</Button>
      <Modal isOpen={open}>
          <Form onSubmit={createFood}>
            <ModalHeader>Food</ModalHeader>
            <ModalBody>
                <Input onChange={changeInputHandler} className="calories" type="number" min="0" placeholder="calories"></Input>
                <Input onChange={changeInputHandler} className="proteins" type="number" min="0"placeholder="proteins"></Input>
                <Input onChange={changeInputHandler} className="fats" type="number" min="0" placeholder="fats"></Input>
                <Input onChange={changeInputHandler} className="carbs" type="number" min="0" placeholder="carbs"></Input>
            </ModalBody>
            <ModalFooter>
              <Button>Add</Button>{' '}
              <Button type="button" onClick={clickHandler} color="danger">Cancel</Button>
            </ModalFooter>
          </Form>
      </Modal>
      <div>
        {food.length? food.map(el => 
        <Item key={Math.random()} id={el.id} name={el.name} Kcals={el.Kcals} fats={el.fats} carbs={el.carbs} proteins={el.proteins}/>
          ) : <> </>}
      </div>
    </>
  );
}

export default List;
