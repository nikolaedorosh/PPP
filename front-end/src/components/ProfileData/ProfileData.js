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
  const { open, clickHandler, userInfo, changeInputHandler, setTargetHandler } =
    useProfileContext();

  return (
    <>
      {userInfo && (
        <div className={styles.card}>
          <h4>Personal Data</h4>
          <p>Age: {} y/o</p>
          <p>Gender: ...</p>
          <p>Weight: ... kg</p>
          <p>Height: ... cm</p>
          <p>Activity: ... </p>
        </div>
      )}

      <Modal isOpen={open}>
        <Form onSubmit={setTargetHandler}>
          <ModalHeader>Target</ModalHeader>
          <ModalBody>
            <Input
              onChange={changeInputHandler}
              className='gender'
              placeholder='gender'
            ></Input>
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
            <Input
              onChange={changeInputHandler}
              className='activity'
              placeholder='activity'
            ></Input>
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
