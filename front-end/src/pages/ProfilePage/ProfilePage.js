import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileData from "../../components/ProfileData/ProfileData";
import ProfileTarget from "../../components/ProfileTarget/ProfileTarget";
import styles from "./profilePage.module.css";
import { useDispatch } from "react-redux";
import * as AuthorizationAction from "../../redux/reducers/userReducer";
import { connect } from "react-redux";

const ProfilePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      AuthorizationAction.addInfo({
        userName: "test",
        userEmail: "test@test.ru",
      })
    );
  }, []);

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

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps)(ProfilePage);
