import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "reactstrap";
import styles from "./header.module.css";

function Header({ darkTheme, setDarkTheme }) {

  const [open, setOpen] = useState(false)

  function openProfile() {
    setOpen(prev => !prev)
  }
  return (
    <div className={styles.wrap} >
      <Link to='/'>Home</Link>
      <Link to='/logger'>Logger</Link>
      <li className='nav-item'>
        <button onClick={() => setDarkTheme(!darkTheme)}>Change Theme</button>
      </li>
      <Button onClick={openProfile}>profile</Button>
      <Modal fade={false} style={{width: "40%", bottom: "5%", left: "30%"}} toggle={openProfile} isOpen={open}>
        <div style={{ height: "100vh"}}>
          hello
        </div>
      </Modal>
    </div>
  );
}

export default Header;
