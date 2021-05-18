import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as AuthorizationAction from "../../redux/reducers/MAIN"; // стало

import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  Legend,
  YAxis,
  Bar,
  BarChart,
  LabelList,
  Label,
} from "recharts";

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

  const addNewUser = (userEmail, userPass, userName) => {
    fetch("http://localhost:3000/user/signupcheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPass,
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
        password: userPass,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        response
          ? dispatch(
              AuthorizationAction.addInfo({
                userName: response.userName,
                userEmail: inputMail.trim(),
                userId: response.userId,
              })
            )
          : window.alert("Incorrect email or password");
      });
  };

  const submitHandler2 = (e) => {
    e.preventDefault();
    if (inputPass.trim() && inputMail.trim()) {
      signInCheck(inputMail.trim(), inputPass.trim());
    } else window.alert("Fill in form fields and try again");
  };

  const googleAuth = async () => {
    await auth.signIn();
    let userEmail = auth.currentUser.fe.Ft.pu;
    let userName = auth.currentUser.fe.Ft.Ue;
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
    console.log("Get googleId");
    dispatch(
      AuthorizationAction.googleId(
        window.gapi.auth2.getAuthInstance().currentUser.get().getId()
      )
    );
  };

  const onSignInClick = () => {
    googleAuth();
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
      <button onClick={onSignInClick}>Sign Up with Google</button>
      Already have an account? <button onClick={changeTest}>Sign In</button>
    </div>
  );
};

export default WelcomePage;
