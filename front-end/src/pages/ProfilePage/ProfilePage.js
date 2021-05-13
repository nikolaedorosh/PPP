import React, { useState } from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileData from "../../components/ProfileData/ProfileData";
import ProfileTarget from "../../components/ProfileTarget/ProfileTarget";
import styles from "./profilePage.module.css";

const ProfilePage = () => {
  // const [profileTarget, setProfileTarget] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //function openmodal
  function openModalHandler() {
    setModalIsOpen(true);
  }
  //function closemodal
  function closeModalHandler() {
    setModalIsOpen(false);
  }
  return (
    <>
      <ProfileCard />
      <ProfileData />
      <button onClick={openModalHandler}>
        <h4>Set Target</h4>
      </button>
      <div>
        {modalIsOpen && (
          <ProfileTarget
            onCancel={closeModalHandler}
            onConfirm={closeModalHandler}
          />
        )}
        {modalIsOpen && <Backdrop onClick={closeModalHandler} />}
      </div>
    </>
  );
};

export default ProfilePage;
