import React from "react";
import { useSelector } from "react-redux";
import { useProfileContext } from "../../context/profileContext";
import styles from "./profileCard.module.css";

const ProfileCard = () => {
  const { clickHandler } = useProfileContext();

  // const id = useSelector((state) => state.userReducer.userID);
  // const name = useSelector((state) => state.userReducer.name);
  // const email = useSelector((state) => state.userReducer.email);

  return (
    <>
      <div className={styles.card}>
        <a href='#'>
          <img
            src='https://bootdey.com/img/Content/avatar/avatar3.png'
            alt=''
          />
        </a>
        {/* <h1>{name}</h1> */}
        {/* <p>{email}</p> */}
        <br />
        <button onClick={clickHandler}>
          {" "}
          <i className='fa fa-edit'></i> Edit profile
        </button>

        <button>
          {" "}
          <i className='fa fa-user'></i> Log Out
        </button>
      </div>
    </>
  );
};

export default ProfileCard;
