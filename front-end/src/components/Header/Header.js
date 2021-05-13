import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

function Header() {
  return (
    <div className={styles.wrap}>
      <Link to='/signup'>SignUp</Link>
      <Link to='/signin'>SignIn</Link>
      <Link to='/profile'>Profile</Link>
      <Link to='/logger'>Logger</Link>
      <Link to='/'>WelcomePage</Link>
    </div>
  );
}

export default Header;
