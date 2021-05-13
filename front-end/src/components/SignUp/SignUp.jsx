import { useEffect, useState } from "react";
import React from 'react'

const SignUp = () => {
  const [auth, setAuth] = useState(null);
  // useEffect(() => {
  //   const params = {
  //     cliendId:
  //       "463369379597-u90ubo7t61e08n9m80pmisgrmfh5g9gn.apps.googleusercontent.com",
  //     scope: email,
  //   };

  //   window.gapi.load("client:auth2", () => {
  //     window.gapi.client.init(params).then(() => {
  //       setAuth(window.gapi.auth2.getAuthInstanse());
  //       onAuthChange(window.gapi.auth2.getAuthInstanse().isSignedIn.get());
  //       window.gapi.auth2.getAuthInstanse().isSignedIn.listen(onAuthChange);
  //     });
  //   });
  // }, []);

  // const onAuthChange = (isSignedIn) => {
  //   if (isSignedIn) {

  //   }
  // }

  return (
    <>
      <input></input>
      <input></input>
      <button>Зарегистрироваться</button>
      <button>Войти с помощью Google</button>
    </>
  );
};

export default SignUp;
