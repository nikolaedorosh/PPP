import { useEffect, useState } from "react";
import React from "react";
import Item from "../Item/Item";
import Meal from "../Meal/Meal";
import BounceLoader from "react-spinners/BounceLoader";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMeal } from "../../redux/actionCreators/mealAC";
import { changeTextSaga } from "../../redux/saga";
import * as TYPES from "../../redux/types/types";

function List() {
  const options = useSelector((state) => state.food.options);
  const week = useSelector((state) => state.week);
  const email = useSelector((state) => state.auth.userEmail);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [scan, setScan] = useState(false);
  const [text, setText] = useState(false);

  function clickHandler() {
    setOpen((prev) => !prev);
    setText("")
    dispatch({
      type: TYPES.CHANGE_OPTIONS,
      payload: [],
    });
  }

  function tabClickHandler() {
    setScan((prev) => !prev);
  }

  useEffect(() => {
      dispatch({ type: TYPES.CHANGE_LOAD, payload: {loading: false}});
  }, [options])


  useEffect(() => {
    if (text) {
      dispatch({ type: TYPES.CHANGE_LOAD, payload: {loading: true}});
      dispatch(changeTextSaga(text));
    }
  }, [text]);

  function changeText(e) {
    setText(e.target.value);
  }

  function createMeal(e) {
    e.preventDefault();
    dispatch(getMeal(options, email));
    setOpen((prev) => !prev);
    setText("");
    dispatch({
      type: TYPES.CHANGE_OPTIONS,
      payload: [],
    });
  }

  return (
    <>
      <Button color='danger' onClick={clickHandler}>
        Eat
      </Button>
      <Modal toggle={clickHandler} isOpen={open}>
        <Form onSubmit={createMeal} inline>
          <ModalHeader>
            meal
            <div>
              <Button onClick={tabClickHandler} type='button'>
                {scan ? "Type" : "Scan"}
              </Button>
            </div>
          </ModalHeader>
          <ModalBody>
          <BounceLoader color="blue" size={150} loading={loading} css={{zIndex: "100", position:"absolute", margin: "35%", marginTop: "20%"}}/>
            {!scan ? (
              <>
                <FormGroup>
                  <Input
                    onChange={changeText}
                    placeholder='search food example: 1 apple 100 grams of buckwheat'
                    value={text ? text : ""}
                  ></Input>
                </FormGroup>
                {options? (
                  options.map((el) => (
                    <Item
                      num={el.num}
                      image={el.image}
                      Kcals={el.info.cal}
                      proteins={el.info.prot}
                      fats={el.info.fat}
                      carbs={el.info.carb}
                    />
                  ))
                ) : (
                  <></>
                )}
              </>
            ) : (
              "scan"
            )}
          </ModalBody>
          <ModalFooter>
            Kcals/proteins/fats/carbs
            <Button>Add Meal</Button>{" "}
            <Button type='button' onClick={clickHandler} color='danger'>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <div>
        {week.length ? (
          [...week].reverse().map((el) => (
            <Meal key={Math.random()} date={el.date} items={el.items} />
          ))
        ) : (
          <> </>
        )}
      </div>
    </>
  );
}

export default List;
