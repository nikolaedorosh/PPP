import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as AuthorizationAction from "../../redux/reducers/MAIN"; // стало
import Button from "@material-ui/core/Button";
import {
  Dialog,
  DialogTitle,
  FormGroup,
  Icon,
  makeStyles,
  TextField,
} from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   button: {
//     margin: theme.spacing(1),
//   },
// }));

const WelcomePage = () => {
  // const classes = useStyles();
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
    <div style={{ width: "1000px", margin: "15px 150px" }}>
      <h1>MARGO SKAZALA PPP</h1>
      <hr></hr>
      Наше приложение создано и разработано комадной экспертов из лаборатории
      Elbrus Bootcamp под чутким руководством царицы пчел Юлии и падре Егора.
      <br></br>Зарегистрируйтесь, чтобы ознакомиться с интерфейсом приложения
      <hr></hr>
      {test ? (
        <FormGroup style={{ alignItems: "center" }}>
          <TextField
            label="Email"
            variant="outlined"
            placeholder="Type email here..."
            onChange={inputMailHandler}
            value={inputMail}
            type="mail"
            required
            style={{ width: "400px" }}
          />
          <br />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            placeholder="Type password here..."
            onChange={inputPassHandler}
            value={inputPass}
            required
            style={{ width: "400px" }}
          />
          <br />
          <TextField
            label="Name"
            variant="outlined"
            placeholder="Name and second name here..."
            onChange={inputNameHandler}
            value={inputName}
            type="text"
            required
            style={{ width: "400px" }}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
            onClick={submitHandler1}
          >
            Sign Up
          </Button>
          <br />
          <Button
            variant="contained"
            color="primary"
            // className={classes.button}
            endIcon={<Icon>fingerprint</Icon>}
            onClick={onSignInClick}
          >
            Sign In with Google
          </Button>
          Already have an account?{" "}
          <Button variant="contained" color="primary" onClick={changeTest}>
            Sign In
          </Button>
        </FormGroup>
      ) : (
        <>
          <FormGroup style={{ alignItems: "center" }}>
            <TextField
              label="Email"
              variant="outlined"
              placeholder="Type email here..."
              onChange={inputMailHandler}
              value={inputMail}
              type="mail"
              required
              style={{ width: "400px" }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              placeholder="Type password here..."
              onChange={inputPassHandler}
              value={inputPass}
              required
              style={{ width: "400px" }}
            />

            <Button
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
              onClick={submitHandler2}
            >
              Sign In
            </Button>
          </FormGroup>
          <div style={{ alignItems: "center" }}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<Icon>fingerprint</Icon>}
              onClick={onSignInClick}
            >
              Sign In with Google
            </Button>
            Already have an account?{" "}
            <Button variant="contained" color="primary" onClick={changeTest}>
              Sign In
            </Button>
          </div>
        </>
      )}
      <hr></hr>
    </div>
  );
};

export default WelcomePage;
