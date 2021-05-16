import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileData from "../../components/ProfileData/ProfileData";
import ProfileTarget from "../../components/ProfileTarget/ProfileTarget";
import styles from "./profilePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as AuthorizationAction from "../../redux/reducers/userReducer";
import { connect } from "react-redux";
import { profileUpdate } from "../../redux/actionCreators/graphicsAC";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.userName);
  const email = useSelector((state) => state.auth.userEmail);

  // useEffect(() => {
  //   dispatch(
  //     AuthorizationAction.addInfo({
  //       userName: "test",
  //       userEmail: "test@test.ru",
  //     })
  //   );
  // }, []);

  //fetch checks back-end for all profileData
  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3000/user/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      const authenticatedUser = await response.json();
      dispatch(profileUpdate(authenticatedUser));
    })();
  }, []);

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
