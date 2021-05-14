import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as AuthorizationAction from "../../redux/reducers/userReducer";

const SignUp = ({ dispatch, isSignedIn, userId, userName }) => {
  const [inputPass, setInputPass] = useState("");
  const [inputMail, setInputMail] = useState("");
  const [auth, setAuth] = useState(null);
  // const {currentUser} = auth
  // let test = null;
  // if (auth) {
  //   console.log(auth.currentUser.ee.ft.Te);
  //   console.log(auth.currentUser.ee.ft.Qt);
  // }

  const inputPassHandler = (e) => {
    setInputPass(e.target.value);
  };

  const inputMailHandler = (e) => {
    setInputMail(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputPass.trim() && inputMail.trim()) {
      dispatch(AuthorizationAction.signIn(Date.now()));
      window.location.assign("/profile");
    } else window.alert("Fill in form fields and try again");
  };

  useEffect(() => {
    const params = {
      clientId:
        "463369379597-u90ubo7t61e08n9m80pmisgrmfh5g9gn.apps.googleusercontent.com",
      scope: "email",
    };

    window.gapi.load("client:auth2", () => {
      window.gapi.client.init(params).then(() => {
        setAuth(window.gapi.auth2.getAuthInstance());
        onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
      });
    });
  }, []);
  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      dispatch(
        //НАЧАЛО ИЗМЕНЕНИЙ
        AuthorizationAction.signIn(
          
            window.gapi.auth2
              .getAuthInstance()
              .currentUser.get()
              .getId()
            // userName: auth.currentUser.ee.ft.Te,
            // userEmail: auth.currentUser.ee.ft.Qt,
          
          // auth.currentUser.ee.ft.Qt mail
          // auth.currentUser.ee.ft.Te name
          // window.gapi.auth2.getAuthInstance()
        )
      );
    } else {
      dispatch(AuthorizationAction.signOut());
    }
  };

  const onSignInClick = () => {
    auth.signIn();
  };

  const onSignOutClick = () => {
    auth.signOut();
  };

  const renderAuthButton = () => {
    // if (isSignedIn === null) {
    //   return null;
    // } else
    if (isSignedIn) {
      return (
        <div>
          <span>{userId}</span>
          <button onClick={onSignOutClick}>Signout</button>
        </div>
      );
    } else {
      return <button onClick={onSignInClick}>Sign In with Google</button>;
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <input
            placeholder="Type email here..."
            onChange={inputMailHandler}
            value={inputMail}
            type="mail"
          />
          <input
            placeholder="Type password here..."
            onChange={inputPassHandler}
            value={inputPass}
            type="password"
          />
        </div>

        <button type="submit" className="btn btn-primary mx-1">
          Sign Up
        </button>
      </form>
      You can choose another way to Sign Up
      {renderAuthButton()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps)(SignUp);
// import { useEffect, useState } from "react";
// import React from "react";
// import * as AuthorizationAction from "../../redux/reducers/userReducer";
// import { connect } from "react-redux"; // одно изменение

// const SignUp = ({ dispatch, isSignedIn, userId }) => {
//   // const dispatch = useDispatch()
//   const [auth, setAuth] = useState(null);
//   console.log(auth);
//   useEffect(() => {
//     const params = {
//       cliendId:
//         "463369379597-u90ubo7t61e08n9m80pmisgrmfh5g9gn.apps.googleusercontent.com",
//       scope: "email",
//     };

//     window.gapi.load("client:auth2", () => {
//       window.gapi.client.init(params).then(() => {
//         setAuth(window.gapi.auth2.getAuthInstance());
//         onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
//         window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
//       });
//     });
//   }, []);

//   // console.log(window.gapi.auth2.getAuthInstance());
//   const onAuthChange = (isSignedIn) => {
//     if (isSignedIn) {
//       dispatch(
//         AuthorizationAction.signIn(
//           window.gapi.auth2.getAuthInstance().currentUser.get().getId()
//         )
//       );
//     } else {
//       dispatch(AuthorizationAction.signOut());
//     }
//   };

//   const onSignInClick = () => {
//     auth.signIn();
//   };

//   const onSignOutClick = () => {
//     auth.signOut();
//   };

//   const renderAuthButton = () => {
//     if (isSignedIn === null) {
//       return null;
//     } else if (isSignedIn) {
//       return (
//         <div>
//           <span>{userId}</span>
//           <button onClick={onSignOutClick}>Signout</button>
//         </div>
//       );
//     } else {
//       return <button onClick={onSignInClick()}>Sign In with Google</button>;
//     }
//   };
//   return <div className='pt-10 back-ground:black'>{renderAuthButton()}</div>;
// };

// //   return (
// //     <>
// //       <input></input>
// //       <input></input>
// //       <button>Зарегистрироваться</button>
// //       <button>Войти с помощью Google</button>
// //     </>
// //   );
// // };

// const mapStateToProps = (state) => {
//   return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
// };

// export default connect(mapStateToProps)(SignUp);
// // export default SignUp;
