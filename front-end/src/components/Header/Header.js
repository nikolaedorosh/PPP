import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

function Header() {
  return (
    <div className={styles.wrap}>
      <Link to='/signup'>Sign Up</Link>
      <Link to='/signin'>Sign In</Link>
      <Link to='/profile'>Profile</Link>
      <Link to='/logger'>Logger</Link>
    </div>
  );
}

export default Header;
