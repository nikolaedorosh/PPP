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
import { useDispatch, useSelector } from "react-redux";
import { addTarget } from "../../redux/actionCreators/graphicsAC";

function ProfileTarget() {
  const dispatch = useDispatch();
  const { targetKcal, targetProteins, targetCarbs, targetFats } = useSelector(
    (state) => state.profile
  );

  const userEmail = useSelector((state) => state.auth.userEmail);

  const { targetModal, setTargetModal, changeInputHandler, targetWeight } =
    useProfileContext();

  const targetHandler = (e) => {
    setTargetModal((prev) => !prev);
  };

  const formTargetHandler = (e) => {
    e.preventDefault();

    dispatch(addTarget({ targetWeight, userEmail }));
    setTargetModal((prev) => !prev);
  };

  return (
    <>
      <button onClick={targetHandler}>
        <h4>Set Target</h4>
      </button>

      <div className={styles.card}>
        <h4>Needed daily intake: {}</h4>
        <p>kCal:{targetKcal}</p>
        <p>Proteins: {targetProteins}</p>
        <p>Carbohydrates: {targetCarbs}</p>
        <p>Fats: {targetFats}</p>

        <h3>Goal: {}</h3>
      </div>

      <Modal isOpen={targetModal}>
        <Form onSubmit={formTargetHandler}>
          <ModalHeader>Target</ModalHeader>
          <ModalBody>
            <Input
              value={targetWeight}
              onChange={changeInputHandler}
              className='targetWeight'
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
