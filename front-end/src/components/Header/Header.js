import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import ProfileModal from "../ProfileModal/ProfileModal";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

import styles from "./header.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    flexGrow: 1,
  },
  changeTheme: {
    marginLeft: theme.spacing(2),
  },
  linkStyle: {
    width: "700px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  colorPrimary: {
    background: "#427276",
    padding: 8,
    borderRadius: 10
  },
  modal: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "inherit",
  },
  logger:{
    marginLeft: 60,
    
  }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='left' ref={ref} {...props} />;
});
function Header({ darkTheme, setDarkTheme }) {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const userName = useSelector((state) => state.auth.userName);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const goToWelcomePage = () => history.push("/welcomepage");
  useEffect(() => {
    if (!isSignedIn) {
      goToWelcomePage();
    }
  }, [isSignedIn]);

  function openProfile() {
    setOpen((prev) => !prev);
  }
  const handleClose = () => {
    setOpen(false);
  };
  return (

    <AppBar position="static" className={classes.colorPrimary}>
      <Toolbar variant="dense" className={classes.root}>
        <Typography variant="h6" color="inherit">
          {darkTheme ? (
            <img
              src="blackLogo.png"
              className={styles.Logo}
            ></img>
          ) : (
            <img
              src="coloredLogo.png"
              className={styles.Logo}
            ></img>
          )}

        </Typography>
        <Box className={classes.linkStyle}>

          {userName ? "" : <Typography variant='h4'> 
                HOME PAGE
              </Typography>}

          {userName ? (
            <>
              <Typography className={classes.logger} variant='h4'> 
                <Link to='/logger'>LOGGER</Link>
              </Typography>
            </>
          ) : (
            <>

            </>
          )}
        </Box>
        <Box
          className={classes.changeTheme}
          display='flex'
          justifyContent='flex-end'
          alignItems='center'
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  onClick={() => setDarkTheme(!darkTheme)}
                  aria-label='login switch'
                />
              }
            />
          </FormGroup>
          {!userName ? (
            ""
          ) : (
            <>
              <IconButton

                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={openProfile}
                placeholder="Profile"
              ></IconButton>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"

              >
                <MenuIcon
                  onClick={openProfile}
                  style={{ color: "white" }}
                ></MenuIcon>
              </IconButton>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"

                className={classes.modal}
              >
                <ProfileModal setOpen={setOpen} />
              </Dialog>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
