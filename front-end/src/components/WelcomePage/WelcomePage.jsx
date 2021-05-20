import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as AuthorizationAction from "../../redux/reducers/MAIN"; // стало
import Button from "@material-ui/core/Button";
import {
  createMuiTheme,
  FormGroup,
  Icon,
  TextField,
  ThemeProvider,
  withStyles,
} from "@material-ui/core";
import { deepPurple, green } from "@material-ui/core/colors";

// const useStyles = makeStyles((theme) => ({
//   button: {
//     margin: theme.spacing(1),
//   },
// }));

const WelcomePage = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const fats = useSelector((state) => state.info.fats);
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
  const goToLogger = () => {
    history.push("/logger");
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

  function validate(email) {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) == false) {
      alert("Введите корректный e-mail");
      return false;
    }
    return true;
  }

  const submitHandler1 = (e) => {
    e.preventDefault();
    if (inputPass.trim() && inputMail.trim() && inputName.trim()) {
      if (validate(inputMail.trim())) {
        addNewUser(inputMail.trim(), inputPass.trim(), inputName.trim());
      }
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
    if (userName && fats) {
      goToProf();
    } else if (userName && !fats) goToLogger();
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
  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

  const CssTextField = withStyles({
    root: {
      "& label.Mui-focused": {
        color: "green",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "green",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "blue",
        },
        "&:hover fieldset": {
          borderColor: "yellow",
        },
        "&.Mui-focused fieldset": {
          borderColor: "white",
        },
      },
    },
  })(TextField);

  return (
    <div
      style={{
        margin: "15px 150px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>MARGO SKAZALA PPP</h1>
      <hr></hr>
      Наше приложение создано и разработано комадной экспертов из лаборатории
      Elbrus Bootcamp под чутким руководством царицы пчел Юлии и падре Егора.
      <br></br>Зарегистрируйтесь, чтобы ознакомиться с интерфейсом приложения
      <hr></hr>
      {test ? (
        <>
          <FormGroup
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              // alignItems: "center",
              background: "white",
              width: "500px",
              borderRadius: "5px",
            }}
          >
            {/* <CssTextField
        label="Custom CSS"
        variant="outlined"
        id="custom-css-outlined-input"
      /> */}
            <TextField
              label="Email"
              variant="outlined"
              placeholder="Type email here..."
              onChange={inputMailHandler}
              value={inputMail}
              type="email"
              id="email"
              name="email"
              required
              style={{ width: "400px", padding: "15px 0 15px 0" }}
            />
            <TextField
              label="password"
              type="password"
              variant="outlined"
              placeholder="Type password here..."
              onChange={inputPassHandler}
              value={inputPass}
              required
              style={{ width: "400px", padding: "15px 0 15px 0" }}
            />
            <TextField
              label="Name"
              variant="outlined"
              placeholder="Name and second name here..."
              onChange={inputNameHandler}
              value={inputName}
              type="text"
              required
              style={{ width: "400px", padding: "15px 0 15px 0" }}
            />
            <Button
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
              onClick={submitHandler1}
            >
              Sign Up
            </Button>
          </FormGroup>
          <div style={{ alignItems: "center", display: "flex" }}>
            Already have an account?
            <Button
              variant="contained"
              color="primary"
              onClick={changeTest}
              style={{ margin: "10px" }}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              color="primary"
              endIcon={<Icon>fingerprint</Icon>}
              onClick={onSignInClick}
              style={{ margin: "25px" }}
            >
              Sign In with Google
            </Button>
          </div>
        </>
      ) : (
        <>
          <FormGroup
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              // alignItems: "center",
              background: "white",
              width: "500px",
              borderRadius: "5px",
            }}
          >
            <TextField
              label="Email"
              variant="outlined"
              placeholder="Type email here..."
              onChange={inputMailHandler}
              value={inputMail}
              type="email"
              id="email"
              name="email"
              required
              style={{ width: "400px", padding: "15px 0 15px 0" }}
            />
            <TextField
              label="password"
              type="password"
              variant="outlined"
              placeholder="Type password here..."
              onChange={inputPassHandler}
              value={inputPass}
              required
              style={{ width: "400px", padding: "15px 0 15px 0" }}
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
          <div style={{ alignItems: "center", display: "flex" }}>
            Not registered yet?
            <Button
              variant="contained"
              color="primary"
              onClick={changeTest}
              style={{ margin: "10px" }}
            >
              Sign Up
            </Button>
            <Button
              variant="contained"
              color="primary"
              endIcon={<Icon>fingerprint</Icon>}
              onClick={onSignInClick}
              style={{ margin: "25px" }}
            >
              Sign In with Google
            </Button>
          </div>
        </>
      )}
      <hr></hr>
    </div>
  );
};

export default WelcomePage;
