import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as AuthorizationAction from "../../redux/reducers/userReducer";

const WelcomePage = () => {
  // { isSignedIn, userId, userName }
  const dispatch = useDispatch();
  const [inputPass, setInputPass] = useState("");
  const [inputMail, setInputMail] = useState("");
  const [auth, setAuth] = useState(null);
  const [test, setTest] = useState(true);
  const userName = useSelector((state) => state.auth.userName);

  const inputPassHandler = (e) => {
    setInputPass(e.target.value);
  };

  const inputMailHandler = (e) => {
    setInputMail(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputPass.trim() && inputMail.trim()) {
      dispatch(
        AuthorizationAction.addInfo({
          userName: inputPass.trim(),
          userEmail: inputMail.trim(),
        })
      );
      // window.location.assign("/profile");
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

  const history = useHistory();
  const goToProf = () => {
    history.push("/profile");
  };

  useEffect(() => {
    console.log(userName);
    if (userName) {
      goToProf();
    }
  }, [userName]);

  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      console.log("Dispatch enter");
      dispatch(
        AuthorizationAction.signIn(
          window.gapi.auth2.getAuthInstance().currentUser.get().getId()
        )
      );
    } else {
      console.log("Dispatch exit");
      dispatch(AuthorizationAction.signOut());
    }
  };

  // const history = useHistory()

  const onSignInClick = () => {
    console.log(auth.currentUser.ee.ft.Te);
    auth.signIn();
    dispatch(
      AuthorizationAction.addInfo({
        userName: auth.currentUser.ee.ft.Te,
        userEmail: auth.currentUser.ee.ft.Qt,
      })
    );
    // setTimeout(() => {
    //   history.push('/profile')

    // }, 5000);
    // .then(window.location.assign("/profile")); редиректит сразу и фетч не до конца отрабатывает, решить(!!!)
  };

  const onSignOutClick = () => {
    auth.signOut();
  };

  //     const renderAuthButton = () => {
  //   // if (isSignedIn === null) {
  //   //   return null;
  //   // } else

  //   // if (isSignedIn) {
  //   //   return (
  //   //     <div>
  //   //       <span>{userId}</span>
  //   //       <button onClick={onSignOutClick}>Signout</button>
  //   //     </div>
  //   //   );
  //   // } else {
  //     return <button onClick={onSignInClick}>Sign In with Google</button>;
  //   // }
  // };
  const changeTest = () => {
    setTest(!test);
  };
  return (
    <div>
      <h1>Some info about PPP</h1>
      {test ? (
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
      ) : (
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
            Sign In
          </button>
        </form>
      )}
      You can choose another way to Sign Up
      <button onClick={onSignInClick}>Sign Up with Google</button>
      Already have an account? <button onClick={changeTest}>Sign In</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps)(WelcomePage);
