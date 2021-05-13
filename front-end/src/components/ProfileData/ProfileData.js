import React from "react";
import styles from "./profileData.module.css";

const ProfileData = () => {
  return (
    <>
      <div className={styles.card}>
        <h4>Personal Data</h4>
        <p>Age: ... y/o</p>
        <p>Gender: ...</p>
        <p>Weight: ... kg</p>
        <p>Height: ... cm</p>
        <p>Activity: ... </p>
      </div>
      <div className={styles.card}>
        <h4>Needed daily intake:</h4>
        <p>kCal:{}</p>
        <p>Proteins: {}</p>
        <p>Carbohydrates: {}</p>
        <p>Fats: {}</p>

        <h3>Goal: {}</h3>
      </div>
    </>
  );
};

export default ProfileData;
