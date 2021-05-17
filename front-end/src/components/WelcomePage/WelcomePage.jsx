import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as AuthorizationAction from "../../redux/reducers/MAIN"; // стало

const WelcomePage = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.userName);
  const [inputPass, setInputPass] = useState("");
  const [inputMail, setInputMail] = useState("");
  const [inputName, setInputName] = useState("");
  const [auth, setAuth] = useState(null);
  const [test, setTest] = useState(true);
  const history = useHistory();
  const goToProf = () => {
    history.push("/edit");
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

  const inputPassHandler = (e) => {
    setInputPass(e.target.value);
  };

  const inputMailHandler = (e) => {
    setInputMail(e.target.value);
  };

  const inputNameHandler = (e) => {
    setInputName(e.target.value);
  };
  // ДО ИЗМЕНЕНИЙ
  // РАБОЧАЯ ВЕРСИЯ ПО SIGNUP
  const addNewUser = (userEmail, userPass, userName) => {
    fetch("http://localhost:3000/user/signupcheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        pass: userPass,
        name: userName,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        response
          ? dispatch(
              AuthorizationAction.addInfo({
                userName: inputName.trim(),
                userEmail: inputMail.trim(),
                userId: response,
              })
            )
          : window.alert("This email already exists");
      });
  };

  const submitHandler1 = (e) => {
    e.preventDefault();
    if (inputPass.trim() && inputMail.trim() && inputName.trim()) {
      addNewUser(inputMail.trim(), inputPass.trim(), inputName.trim());
    } else window.alert("Fill in form fields and try again");
  };

  const signInCheck = (userEmail, userPass) => {
    fetch("http://localhost:3000/user/signincheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        pass: userPass,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        response
          ? dispatch(
              AuthorizationAction.addInfo({
                userName: inputName.trim(),
                userEmail: inputMail.trim(),
                userId: response,
              })
            )
          : window.alert("Incorrect email or password");
      });
  };

  const submitHandler2 = (e) => {
    e.preventDefault();
    if (inputPass.trim() && inputMail.trim() && inputName.trim()) {
      signInCheck(inputPass.trim(), inputMail.trim());
    } else window.alert("Fill in form fields and try again");
  };

  const googleAuth = () => {
    auth.signIn();
    let userEmail = auth.currentUser.ee.ft.Qt;
    let userName = auth.currentUser.ee.ft.Te;
    // auth.currentUser.ee.ft.Te,
    // //     userEmail: auth.currentUser.ee.ft.Qt,
    fetch("http://localhost:3000/user/googleAuth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        name: userName,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        response
          ? dispatch(
              AuthorizationAction.addInfo({
                userName: userName,
                userEmail: userEmail,
                userId: response,
              })
            )
          : window.alert("Something went wrong");
      });
  };

  useEffect(() => {
    if (userName) {
      goToProf();
    }
  }, [userName]);

  const onAuthChange = () => {
    console.log("Dispatch enter");
    dispatch(
      AuthorizationAction.googleId(
        window.gapi.auth2.getAuthInstance().currentUser.get().getId()
      )
    );
  };

  const onSignInClick = () => {
    googleAuth();
    // auth.signIn();
    // googleAuth();
    // dispatch(
    //   AuthorizationAction.addInfo({
    //     userName: auth.currentUser.ee.ft.Te,
    //     userEmail: auth.currentUser.ee.ft.Qt,
    //   })
    // );
  };

  const changeTest = () => {
    setTest(!test);
  };

  return (
    <div>
      <h1>Some info about PPP</h1>
      {test ? (
        <form onSubmit={submitHandler1}>
          <div>
            <input
              placeholder="Type email here..."
              onChange={inputMailHandler}
              value={inputMail}
              type="mail"
              required
            />
            <input
              placeholder="Type password here..."
              onChange={inputPassHandler}
              value={inputPass}
              type="password"
              required
            />
            <input
              placeholder="Type your name and second name here..."
              onChange={inputNameHandler}
              value={inputName}
              type="text"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary mx-1">
            Sign Up
          </button>
        </form>
      ) : (
        <form onSubmit={submitHandler2}>
          <div>
            <input
              placeholder="Type email here..."
              onChange={inputMailHandler}
              value={inputMail}
              type="mail"
              required
            />
            <input
              placeholder="Type password here..."
              onChange={inputPassHandler}
              value={inputPass}
              type="password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary mx-1">
            Sign In
          </button>
        </form>
      )}
      You can choose another way to Sign Up
      <button onClick={googleAuth}>Sign Up with Google</button>
      Already have an account? <button onClick={changeTest}>Sign In</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps)(WelcomePage);
