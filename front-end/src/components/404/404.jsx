import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <h1>404</h1>

      <h3>Page Not Found</h3>

      <h3>This page isn't part of ours!</h3>

      <Link to='/logger'>
        <button>Go Back to Main</button>
      </Link>

      <img src='https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif' />
    </>
  );
};

export default PageNotFound;
