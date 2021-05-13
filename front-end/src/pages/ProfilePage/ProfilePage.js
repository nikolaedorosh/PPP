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
      <ProfileTarget />
    </>
  );
};

export default ProfilePage;
