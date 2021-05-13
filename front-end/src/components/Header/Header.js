import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

function Header({ darkTheme, setDarkTheme }) {
  return (
    <div className={styles.wrap}>
      <Link to='/signup'>SignUp</Link>
      <Link to='/signin'>SignIn</Link>
      <Link to='/profile'>Profile</Link>
      <Link to='/logger'>Logger</Link>
      <Link to='/'>WelcomePage</Link>

      <li className='nav-item'>
        <button onClick={() => setDarkTheme(!darkTheme)}>Change Theme</button>
      </li>
    </div>
  );
}

export default Header;
