import React from "react";
import styles from "./profileTarget.module.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
} from "reactstrap";

function ProfileTarget(props) {
  const targetHandler = () => {};

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
    </>
  );
}

export default ProfileTarget;
