import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import EditIcon from "@material-ui/icons/Edit";
import { newPicChange } from "../../redux/actionCreators/graphicsAC";
import * as AuthorizationAction from "../../redux/reducers/MAIN";
import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Icon, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
const ProfileModal = ({ setOpen }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userName = useSelector((state) => state.auth.userName);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const userTarget = useSelector((state) => state.info.targetWeight);
  const userKcal = useSelector((state) => state.info.kcal);
  const userProteins = useSelector((state) => state.info.Proteins);
  const userCarbohydrates = useSelector((state) => state.info.carbohydrates);
  const userFats = useSelector((state) => state.info.fats);
  console.log();
  const id = useSelector((state) => state.auth.userId);
  const userProfileImg = useSelector((state) => state.auth.userProfileImg);
  const inputRef = useRef(null);
  const onSignOutClick = () => {
    dispatch(AuthorizationAction.signOut());
    setOpen((prev) => !prev);
  };
  const goToEdit = () => {
    history.push("/edit");
    setOpen((prev) => !prev);
  };
  const useStyles = makeStyles((theme) => ({
    container: {
      position:"relative",
      // padding: "0 105px",
      display: "flex",
      justifyContent: "center",
    },
    box: {
      padding: "20px",
      margin: "0, 20px",
      background: "#427276",
      color: "white",
    },
    avatar: {
      width: "150px",
      height: "150px",
    },
    classForText: {
      marginLeft: "12px",
      padding: "8px",
    },
    input: {
      display: "none",
    },
    button: {
      position: "absolute",
      padding: "2px 8px",
      fontSize: "12px",
      right: "2vw"
    },
  }));
  const classes = useStyles();

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
    <Box className={classes.box}>
      <h4>Profile</h4>
      {/* <DialogTitle>Profile</DialogTitle> */}
      <Box p={2} className={classes.container}>
        <Avatar
          alt="Remy Sharp"
          src={"/img/" + userProfileImg}
          className={classes.avatar}
        />
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="icon-button-file">
          <IconButton
            aria-label="upload picture"
            component="span"
            onClick={picHandler}
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </Box>
      <Box
        component="span"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        Name:
        <Typography className={classes.classForText} variant="subtitle2">
          {userName}
        </Typography>
      </Box>
      <Box
        component="span"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        Email:
        <Typography className={classes.classForText} variant="subtitle2">
          {userEmail}
        </Typography>
      </Box>
      <Box
        component="span"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        Weigth:
        <Typography className={classes.classForText} variant="subtitle2">
          {userTarget}
        </Typography>
      </Box>
      <Box
        component="span"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        Current kcal:
        <Typography className={classes.classForText} variant="subtitle2">
          {userKcal}
        </Typography>
      </Box>
      <Box
        component="span"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        Current Prot:
        <Typography className={classes.classForText} variant="subtitle2">
          {userProteins}
        </Typography>
      </Box>

      <Box
        component="span"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        Current fats:
        <Typography className={classes.classForText} variant="subtitle2">
          {userFats}
        </Typography>
      </Box>

      <Box
        component="span"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        Current carboh :
        <Typography className={classes.classForText} variant="subtitle2">
          {userCarbohydrates}
        </Typography>
      </Box>
      <Button
        variant="contained"
        endIcon={<Icon>editIcon</Icon>}
        onClick={goToEdit}
      >
        Change profile
      </Button>
      <hr></hr>
      <Button
        variant="contained"
        onClick={onSignOutClick}
      >
        LogOut
      </Button>

      <input
        type="file"
        id="fileUploader"
        hidden="hidden"
        ref={inputRef}
        onChange={uploadOnChange}
      />
      {/* <IconButton onClick={picHandler} className='button'>
        <EditIcon />
      </IconButton> */}
    </Box>
  );
};

export default ProfileModal;
