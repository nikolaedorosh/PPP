import { useProfileContext } from "../../context/profileContext";
import styles from "./profileCard.module.css";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import { uploadImg } from "../../redux/actionCreators/graphicsAC";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfileCard = () => {
  const { clickHandler } = useProfileContext();
  const dispatch = useDispatch();

  const imgChange = (e) => {
    const img = e.target.files[0];
    const imgData = new FormData();
    imgData.append("img", img, img.name);
    console.log(imgData);
    //send to server
    dispatch(uploadImg({ imgData, id }));
  };

  const editImg = () => {
    const image = document.getElementById("imgInput");
    image.click();
  };
  const id = useSelector((state) => state.auth.userId);
  const name = useSelector((state) => state.auth.userName);
  const email = useSelector((state) => state.auth.userEmail);
  const img = useSelector((state) => state.auth.userProfileImg);

  return (
    <>
      <div className={styles.card}>
        <a href='#'>
          <img src={img} alt='' />
          <input
            type='file'
            id='imgInput'
            hidden='hidden'
            onChange={imgChange}
          />
          <Tooltip title='Change Profile Picture' placement='top-end'>
            <IconButton onClick={editImg} className='button'>
              <EditIcon color='primary' />
            </IconButton>
          </Tooltip>
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
