import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button, Modal } from "reactstrap";
import styles from "./header.module.css";
import * as AuthorizationAction from "../../redux/reducers/MAIN";
import ProfileModal from "../ProfileModal/ProfileModal";

function Header({ darkTheme, setDarkTheme }) {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const userName = useSelector((state) => state.auth.userName);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const goToWelcomePage = () => history.push("/welcomepage");
  useEffect(() => {
    if (!isSignedIn) {
      goToWelcomePage();
    }
  }, [isSignedIn]);

  const onSignOutClick = () => {
    dispatch(AuthorizationAction.signOut());
  };

  function openProfile() {
    setOpen((prev) => !prev);
  }
  return (
    <div className={styles.wrap}>
      <Link to="/welcomepage">HomePage</Link>
      {userName ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/logger">Logger</Link>
          <button onClick={onSignOutClick}>LogOut</button>
          <Button onClick={openProfile}>profile</Button>
        </>
      ) : (
        <>
          <Link to="/aboutus"> AboutUs</Link>
        </>
      )}
      <li className="nav-item">
        <button onClick={() => setDarkTheme(!darkTheme)}>Change Theme</button>
      </li>
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
