import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { newPicChange } from "../../redux/actionCreators/graphicsAC";

const ProfileModal = ({ setOpen }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  //use selectors
  const userName = useSelector((state) => state.auth.userName);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const userTarget = useSelector((state) => state.info.targetWeight);
  const id = useSelector((state) => state.auth.userId);
  const userProfileImg = useSelector((state) => state.auth.userProfileImg);
  console.log(id);
  const inputRef = useRef(null);

  const goToEdit = () => {
    history.push("/edit");
    setOpen((prev) => !prev);
  };

  //upload pic
  const uploadOnChange = async (e) => {
    e.preventDefault();
    const img = e.target.files[0];
    const data = new FormData();
    console.log({ img });
    data.append("photo", img);

    let response = await fetch(`http://localhost:3000/picUpload/${id}`, {
      method: "POST",
      body: data,
    });
    response = await response.json();
    console.log(response);
    dispatch(newPicChange(response));
  };
  const picHandler = () => {
    inputRef.current.click();
  };

  const newImg = (param) => `/img/${param}`;
  return (
    <>
      <h2>Profile</h2>

      <div>
        <img src={"/img/" + userProfileImg} width='100' alt='profile-pic' />
      </div>

      <input
        type='file'
        id='fileUploader'
        hidden='hidden'
        ref={inputRef}
        onChange={uploadOnChange}
      />
      <IconButton onClick={picHandler} className='button'>
        <EditIcon />
      </IconButton>

      <h4>Name</h4>
      <span>{userName}</span>

      <h4>Email</h4>
      <span>{userEmail}</span>

      <h4>Target Weight</h4>
      <span>{userTarget}</span>

      <button onClick={goToEdit}>Change My Details</button>
    </>
  );
};

export default ProfileModal;
