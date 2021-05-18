import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import EditIcon from "@material-ui/icons/Edit";
import { newPicChange } from "../../redux/actionCreators/graphicsAC";
import * as AuthorizationAction from '../../redux/reducers/MAIN';

import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';



const ProfileModal = ({ setOpen }) => {  
  const dispatch = useDispatch();
  const history = useHistory();

  //use selectors
  const userName = useSelector((state) => state.auth.userName);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const userTarget = useSelector((state) => state.info.targetWeight);
  const id = useSelector((state) => state.auth.userId);
  const userProfileImg = useSelector((state) => state.auth.userProfileImg);
  const inputRef = useRef(null);
  const onSignOutClick = () => {
    dispatch(AuthorizationAction.signOut());
    setOpen((prev) => !prev);
  };
  const goToEdit = () => {
    history.push('/edit');
    setOpen((prev) => !prev);
  };
  const useStyles = makeStyles((theme) => ({
    container:{
      display: 'flex',
      justifyContent: 'center'
    },
    avatar:{
      width: "150px",
      height: "150px"
    },
    classForText:{
      marginLeft: "12px",
      padding: "8px"
    },
    input: {
      display: 'none',
    },
    button:{
      padding: '2px 8px',
      fontSize:  '12px'
    }
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
    
    <>
        <DialogTitle>Profile</DialogTitle>
        <Box p={2} className={classes.container} >
        <Avatar alt="Remy Sharp" src={"/img/" + userProfileImg} className={classes.avatar} />
        <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span" onClick={picHandler}>
           <PhotoCamera />
         </IconButton>
         </label>
        </Box>
        <Box p={1} component="span"display="flex" flexDirection="row" alignItems="center">Name:
        <Typography className={classes.classForText} variant='subtitle2'>{userName}</Typography>
        </Box>
        <Box p={1} component="span" display="flex" flexDirection="row" alignItems="center">Email:
        <Typography className={classes.classForText} variant='subtitle2'>{userEmail}</Typography>
        </Box>
        <Box  p={1} component="span" display="flex" flexDirection="row" alignItems="center">Weigth:
        <Typography className={classes.classForText} variant='subtitle2'>{userTarget}</Typography>
        </Box>
        <Box  p={1} component="span" display="flex" flexDirection="row" alignItems="center">Current kcal:
        <Typography className={classes.classForText} variant='subtitle2'>Kcal</Typography>
        </Box>
        <Box  p={1} component="span" display="flex" flexDirection="row" alignItems="center">Current Prot:
        <Typography className={classes.classForText} variant='subtitle2'>Prot</Typography>
        </Box>
        
        <Box  p={1} component="span" display="flex" flexDirection="row" alignItems="center">Current fats:
        <Typography className={classes.classForText} variant='subtitle2'>Fats</Typography>
        </Box>
        
        
        <Box  p={1} component="span" display="flex" flexDirection="row" alignItems="center">Current carboh :
        <Typography className={classes.classForText} variant='subtitle2'>Carboh</Typography>
        </Box>
        <Button onClick={goToEdit} variant="outlined">Change My Details</Button>
        <Button  onClick={onSignOutClick} variant="outlined">LogOut</Button>

     

      <input
        type='file'
        id='fileUploader'
        hidden='hidden'
        ref={inputRef}
        onChange={uploadOnChange}
      />
      {/* <IconButton onClick={picHandler} className='button'>
        <EditIcon />
      </IconButton> */}

      
    </>
  );
};

export default ProfileModal;
