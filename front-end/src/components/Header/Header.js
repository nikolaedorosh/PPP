
import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// import { Button, Modal } from "reactstrap";
import styles from './header.module.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header({ darkTheme, setDarkTheme }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  function openProfile() {
    setOpen((prev) => !prev);
  }
  return (

    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
            <Link to="/">Home</Link>
            <Link to="/logger">Logger</Link>
            <Link to="/edit">Edit</Link>
          </IconButton>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  onClick={() => setDarkTheme(!darkTheme)}
                  aria-label="login switch"
                />
              }
            />
          </FormGroup>
          {/* <Typography variant="h6" color="inherit">
            Photos
          </Typography> */}
        </Toolbar>
      </AppBar>



      <Button onClick={openProfile}>profile</Button>

      <Modal
        fade={false}
        style={{ width: "40%", bottom: "5%", left: "30%" }}
        toggle={openProfile}
        isOpen={open}
      >
        <div style={{ height: "100vh" }}>
          <ProfileModal setOpen={setOpen} />
        </div>
      </Modal>
    </div>
  );
}

export default Header;

// <div className={styles.wrap} >
//   <Link to='/'>Home</Link>
//   <Link to='/logger'>Logger</Link>
//   <Link to='/edit'>Edit</Link>
//   <li className='nav-item'>
//     <button onClick={() => setDarkTheme(!darkTheme)}>Change Theme</button>
//   </li>
//   {/* <Button onClick={openProfile}>profile</Button> */}
//   <Modal fade={false} style={{width: "40%", bottom: "5%", left: "30%"}} toggle={openProfile} isOpen={open}>
//     <div style={{ height: "100vh"}}>
//       hello
//   </Modal>
//     </div>
