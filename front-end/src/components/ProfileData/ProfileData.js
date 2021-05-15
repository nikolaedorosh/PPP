import React, { useState } from "react";
import styles from "./profileData.module.css";
import { useProfileContext } from "../../context/profileContext";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { personalInfoHandler } from "../../redux/actionCreators/graphicsAC";

const ProfileData = () => {
  const dispatch = useDispatch();

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("");
  const [bmi, setBmi] = useState("");

  const { open, setOpen, clickHandler } = useProfileContext();

  // all data selectors
  // const { age, gender, weight, height, activity, bmi } = useSelector(
  //   (state) => state.info
  // );

  const id = useSelector((state) => state.auth.userId);

  //form handler
  const setInputDetailsHandler = (e) => {
    e.preventDefault();

    dispatch(
      personalInfoHandler({
        age,
        gender,
        weight,
        height,
        activity,
        id,
        bmi,
      })
    );
    setOpen((prev) => !prev);
  };

  // on change input
  const changeInputHandler = async (e) => {
    const input = e.target.value;
    switch (e.target.className.split(" ")[0]) {
      case "gender":
        setGender(input);
        break;
      case "age":
        setAge(input);
        break;
      case "weight":
        setWeight(input);
        break;
      case "height":
        setHeight(input);
        break;
      case "activity":
        setActivity(input);
        break;
      default:
        break;
    }
    //calculate bmi
    await setBmi((prev) => {
      let activeBmi;
      switch (activity) {
        case "sedentary":
          activeBmi = 1.01;
          break;
        case "light":
          activeBmi = 1.007;
          break;
        case "moderate":
          activeBmi = 1.004;
          break;
        case "extraActive":
          activeBmi = 1.001;
          break;
        default:
          activeBmi = 1;
          break;
      }

      let ageBmi;
      if (Number(age) <= 20) {
        ageBmi = 1.002;
      } else if (Number(age) <= 40 && Number(age) > 20) {
        ageBmi = 1.008;
      } else {
        ageBmi = 1.012;
      }

      let genderBmi;
      switch (gender) {
        case "man":
          genderBmi = 0.99;
          break;
        case "woman":
          genderBmi = 1.01;
          break;
        default:
          genderBmi = 1;
          break;
      }

      return Number(
        (weight / (0.0001 * height * height)) * activeBmi * ageBmi * genderBmi
      ).toFixed(2);
    });
  };

  return (
    <>
      <div className={styles.card}>
        <h4>Personal Data</h4>
        <p>Age: {age} y/o</p>
        <p>Gender: {gender}</p>
        <p>Weight: {weight} kg</p>
        <p>Height: {height} cm</p>
        <p>Activity: {activity} </p>
      </div>

      <Modal isOpen={open}>
        <Form onSubmit={setInputDetailsHandler}>
          <ModalHeader>Personal Details</ModalHeader>
          <ModalBody>
            <select className='gender' onChange={changeInputHandler}>
              <option selected>Open this select menu</option>
              <option value='man'>Man</option>
              <option value='woman'>Woman</option>
            </select>

            <Input
              onChange={changeInputHandler}
              required='No Input Inserted!'
              className='age'
              type='number'
              min='0'
              placeholder='age'
            ></Input>
            <Input
              required='No Input Inserted!'
              onChange={changeInputHandler}
              className='weight'
              type='number'
              min='0'
              placeholder='weight'
            ></Input>
            <Input
              required='No Input Inserted!'
              onChange={changeInputHandler}
              className='height'
              type='number'
              min='0'
              placeholder='height'
            ></Input>
            <select className='activity' onChange={changeInputHandler}>
              <option value='sedentary'>
                Sedentary: little to no oxercise
              </option>
              <option value='light'>Light: 1-3 times/week</option>
              <option value='moderate'>Moderate: 4-5 times/week</option>
              <option value='extraActive'>
                Extra Active: very intense exercise daily
              </option>
            </select>
          </ModalBody>
          <ModalFooter>
            <Button>Add</Button>{" "}
            <Button type='button' onClick={clickHandler} color='danger'>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default ProfileData;
