import { useProfileContext } from "../../context/profileContext";
import styles from "./profileCard.module.css";

import React from "react";
import { useSelector } from "react-redux";

const ProfileCard = ({ dispatch }) => {
  const { clickHandler } = useProfileContext();

  const name = useSelector((state) => state.auth.userName);
  const email = useSelector((state) => state.auth.userEmail);

  return (
    <>
      <div className={styles.card}>
        <a href='#'>
          <img
            src='https://bootdey.com/img/Content/avatar/avatar3.png'
            alt=''
          />
        </a>
        <h1>{name}</h1>
        <p>{email}</p>
        <br />
        <button onClick={clickHandler}>
          {" "}
          <i className='fa fa-edit'></i> Edit profile
        </button>
      </div>
    </>
  );
};

export default ProfileCard;
