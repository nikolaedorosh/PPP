import React from "react";
import styles from "./profileTarget.module.css";
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

function ProfileTarget() {
  const { targetModal, setTargetModal, changeInputHandler } =
    useProfileContext();

  const targetHandler = (e) => {
    setTargetModal((prev) => !prev);
  };

  const formTargetHandler = (e) => {
    e.preventDefault();
    setTargetModal((prev) => !prev);
  };

  return (
    <>
      <button onClick={targetHandler}>
        <h4>Set Target</h4>
      </button>

      <div className={styles.card}>
        <h4>Needed daily intake:</h4>
        <p>kCal:{}</p>
        <p>Proteins: {}</p>
        <p>Carbohydrates: {}</p>
        <p>Fats: {}</p>

        <h3>Goal: {}</h3>
      </div>

      <Modal isOpen={targetModal}>
        <Form onSubmit={formTargetHandler}>
          <ModalHeader>Target</ModalHeader>
          <ModalBody>
            <Input
              onChange={changeInputHandler}
              className='wantedWeight'
              placeholder='weight in kilograms'
            ></Input>
          </ModalBody>
          <ModalFooter>
            <Button>Add</Button>{" "}
            <Button type='button' onClick={targetHandler} color='danger'>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}

export default ProfileTarget;
