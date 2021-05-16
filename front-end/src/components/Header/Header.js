import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

function Header({ darkTheme, setDarkTheme }) {
  const userName = useSelector((state) => state.auth.userName)  
  return (
    <div className={styles.wrap}>
      <Link to='/welcomepage'>HomePage</Link>
      {
        userName? 
        <>
        <Link to='/profile'>Profile</Link>
      <Link to='/logger'>Logger</Link>
      </> :
      <>
      <Link to='/aboutus'> AboutUs</Link>
      </>
      }
      {/* <Link to='/signin'>SignIn</Link> */}
      

      <li className='nav-item'>
        <button onClick={() => setDarkTheme(!darkTheme)}>Change Theme</button>
      </li>
    </div>
  );
}

export default Header;
