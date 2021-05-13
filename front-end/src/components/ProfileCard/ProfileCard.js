import React from "react";
import styles from "./profileCard.module.css";

const ProfileCard = () => {
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
        <button>
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
