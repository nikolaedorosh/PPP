import React, { createContext, useCallback, useContext, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
} from "reactstrap";

const profileContext = createContext();

const ProfileContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const [userInfo, setUserInfo] = useState(true);

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("");

  const setTargetHandler = (e) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  function changeInputHandler(e) {
    const input = e.target.value;
    switch (e.target.className.split(" ")[0]) {
      case "gender":
        setGender(input);
        break;
      case "age":
        setAge(input);
        break;
      case "weight":
        setWeight(input);
        break;
      case "height":
        setHeight(input);
        break;
      case "activity":
        setActivity(input);
        break;
      default:
        break;
    }
  }

  const clickHandler = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <profileContext.Provider
      value={{
        open,
        setOpen,
        clickHandler,
        userInfo,
        changeInputHandler,
        setTargetHandler,
      }}
    >
      {children}
    </profileContext.Provider>
  );
};

export const useProfileContext = () => useContext(profileContext);

export default ProfileContextProvider;
