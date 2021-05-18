import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
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
  return (
    
    <>
        <DialogTitle>Profile</DialogTitle>
        <Box p={2} className={classes.container} >
        <Avatar alt="Remy Sharp" src="https://res.cloudinary.com/demo/image/facebook/w_150,h_150,c_fill,d_avatar2.png/non_existing_id.jpg" className={classes.avatar} />
        <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
           <PhotoCamera />
         </IconButton>
         </label>
        </Box>
        <Box p={2} component="span"display="flex" flexDirection="row" alignItems="center">Name:
        <Typography className={classes.classForText} variant='subtitle2'>{userName}</Typography>
        </Box>
        <Box p={2} component="span" display="flex" flexDirection="row" alignItems="center">Email:
        <Typography className={classes.classForText} variant='subtitle2'>Email</Typography>
        </Box>
        <Box  p={2} component="span" display="flex" flexDirection="row" alignItems="center">Weigth:
        <Typography className={classes.classForText} variant='subtitle2'>Weigth</Typography>
        </Box>
        <Button onClick={goToEdit} variant="outlined">Change My Details</Button>
        <Button  onClick={onSignOutClick} variant="outlined">LogOut</Button>
    </>
  );
};

export default ProfileModal;
