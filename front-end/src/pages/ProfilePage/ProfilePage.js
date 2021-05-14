import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileData from "../../components/ProfileData/ProfileData";
import ProfileTarget from "../../components/ProfileTarget/ProfileTarget";
import styles from "./profilePage.module.css";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  // const dispatch = useDispatch();

  // const id = useSelector((state) => state.userReducer.userID);
  // const name = useSelector((state) => state.userReducer.name);
  // const email = useSelector((state) => state.userReducer.email);

  // useEffect(() => {
  //   (async () => {
  // const response = await fetch(`http://localhost:3001/user/${id}`);
  //     const list = await response.json();
  //   })();
  // }, []);

  return (
    <>
      <ProfileCard />
      <ProfileData />
      <ProfileTarget />
    </>
  );
};

export default ProfilePage;
