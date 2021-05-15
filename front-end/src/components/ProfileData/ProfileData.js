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

const ProfileData = () => {
  const {
    age,
    gender,
    weight,
    height,
    activity,
    bodyBmi,
    open,
    clickHandler,
    changeInputHandler,
    setInputDetailsHandler,
  } = useProfileContext();

  return (
    <>
      <div className={styles.card}>
        <h4>Personal Data</h4>
        <p>Age: {age} y/o</p>
        <p>Gender: {gender}</p>
        <p>Weight: {weight} kg</p>
        <p>Height: {height} cm</p>
        <p>Activity: {activity} </p>
        <p>BMI: {bodyBmi} </p>
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
              className='age'
              type='number'
              min='0'
              placeholder='age'
            ></Input>
            <Input
              onChange={changeInputHandler}
              className='weight'
              type='number'
              min='0'
              placeholder='weight'
            ></Input>
            <Input
              onChange={changeInputHandler}
              className='height'
              type='number'
              min='0'
              placeholder='height'
            ></Input>
            <select className='activity' onChange={changeInputHandler}>
              <option selected>Open this select menu</option>
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
