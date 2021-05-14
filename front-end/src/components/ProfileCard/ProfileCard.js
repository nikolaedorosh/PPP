import React from "react";
import { useProfileContext } from "../../context/profileContext";
import styles from "./profileCard.module.css";

const ProfileCard = () => {
  const { clickHandler } = useProfileContext();

  return (
    <>
      <div className={styles.card}>
        <a href='#'>
          <img
            src='https://bootdey.com/img/Content/avatar/avatar3.png'
            alt=''
          />
        </a>
        <h1>Camila Smith</h1>
        <p>deydey@theEmail.com</p>
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
