import React, { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";

const profileContext = createContext();

const ProfileContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [targetModal, setTargetModal] = useState(false);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [bodyBmi, setBodyBmi] = useState("");

  const email = useSelector((state) => state.auth.userEmail);

  const setInputDetailsHandler = async (e) => {
    e.preventDefault();

    console.log();
    //we fetch to back personal details here
    const data = {
      age,
      gender,
      weight,
      height,
      activity,
      bmi: bodyBmi,
    };

    const response = await fetch(`http://localhost:3000/profileData/${email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const dbData = await response.json();
    console.log(dbData);

    setOpen((prev) => !prev);
  };

  const clickHandler = () => {
    setOpen((prev) => !prev);
  };

  function changeInputHandler(e) {
    const input = e.target.value;
    switch (e.target.className.split(" ")[0]) {
      case "gender":
        setGender(input);
        break;
      case "targetWeight":
        setTargetWeight(input);
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
    setBodyBmi((prev) => {
      let activeBmi;
      switch (activity) {
        case "sedentary":
          activeBmi = 1.01;
          break;
        case "light":
          activeBmi = 1.007;
          break;
        case "moderate":
          activeBmi = 1.004;
          break;
        case "extraActive":
          activeBmi = 1.001;
          break;
        default:
          activeBmi = 1;
          break;
      }

      let ageBmi;
      if (Number(age) <= 20) {
        ageBmi = 1.002;
      } else if (Number(age) <= 40 && Number(age) > 20) {
        ageBmi = 1.008;
      } else {
        ageBmi = 1.012;
      }

      let genderBmi;
      switch (gender) {
        case "man":
          genderBmi = 0.99;
          break;
        case "woman":
          genderBmi = 1.01;
          break;
        default:
          genderBmi = 1;
          break;
      }

      return (
        (weight / (0.0001 * height * height)) *
        activeBmi *
        ageBmi *
        genderBmi
      ).toFixed(2);
    });
  }

  return (
    <profileContext.Provider
      value={{
        open,
        setOpen,
        clickHandler,
        changeInputHandler,
        setInputDetailsHandler,
        targetModal,
        setTargetModal,
        targetWeight,
      }}
    >
      {children}
    </profileContext.Provider>
  );
};

export const useProfileContext = () => useContext(profileContext);

export default ProfileContextProvider;
