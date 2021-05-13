import React, { useState } from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileData from "../../components/ProfileData/ProfileData";
import ProfileTarget from "../../components/ProfileTarget/ProfileTarget";
import styles from "./profilePage.module.css";

const ProfilePage = () => {
  return (
    <>
      <ProfileCard />
      <ProfileData />
      <ProfileTarget />
    </>
  );
};

export default ProfilePage;
