import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { personalInfoHandler } from '../../redux/actionCreators/graphicsAC';

const EditProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //form handler
  const setInputDetailsHandler = (e) => {
    e.preventDefault();
    dispatch(
      personalInfoHandler({
        age,
        gender,
        weight,
        height,
        activity,
        id,
        bmi,
        targetWeight,
      })
    );
    history.push('/logger');
  };

  // use selectors
  const userName = useSelector((state) => state.auth.userName);
  const id = useSelector((state) => state.auth.userId);
  const stateAge = useSelector((state) => state.info.age);
  const stateWeight = useSelector((state) => state.info.weight);
  const stateHeight = useSelector((state) => state.info.height);
  const stateTargetWeight = useSelector((state) => state.info.targetWeight);
  const stateGender = useSelector((state) => state.info.gender);
  const stateActivity = useSelector((state) => state.info.activity);

  //use States
  const [age, setAge] = useState(stateAge);
  const [gender, setGender] = useState(stateGender);
  const [weight, setWeight] = useState(stateWeight);
  const [height, setHeight] = useState(stateHeight);
  const [activity, setActivity] = useState(stateActivity);
  const [bmi, setBmi] = useState('');
  const [targetWeight, setTargetWeight] = useState(stateTargetWeight);

  const clickHandler = () => {
    history.push('/logger');
  };

  // on change input
  const changeInputHandler = async (e) => {
    const input = e.target.value;
    switch (e.target.className.split(' ')[0]) {
      case 'gender':
        setGender(input);
        break;
      case 'age':
        setAge(input);
        break;
      case 'weight':
        setWeight(input);
        break;
      case 'height':
        setHeight(input);
        break;
      case 'activity':
        setActivity(input);
        break;
      case 'targetWeight':
        setTargetWeight(input);
        break;
      default:
        break;
    }
    //calculate bmi
    await setBmi((prev) => {
      let activeBmi;
      switch (activity) {
        case 'sedentary':
          activeBmi = 1.01;
          break;
        case 'light':
          activeBmi = 1.007;
          break;
        case 'moderate':
          activeBmi = 1.004;
          break;
        case 'extraActive':
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
        case 'man':
          genderBmi = 0.99;
          break;
        case 'woman':
          genderBmi = 1.01;
          break;
        default:
          genderBmi = 1;
          break;
      }

      return Number(
        (weight / (0.0001 * height * height)) * activeBmi * ageBmi * genderBmi
      ).toFixed(2);
    });
  };

  return (
    <>
      <h2> {userName},</h2>
      <span>Please insert all your details here!</span>
      <br />
      <br />
      <form onSubmit={setInputDetailsHandler}>
        <select value={gender} className="gender" onChange={changeInputHandler}>
          <option selected>Open this select menu</option>
          <option value="man">Man</option>
          <option value="woman">Woman</option>
        </select>
        <input
          onChange={changeInputHandler}
          required="No Input Inserted!"
          className="age"
          type="number"
          min="0"
          value={age}
          max="130"
          placeholder="age"
        ></input>
        <input
          required="No Input Inserted!"
          onChange={changeInputHandler}
          className="weight"
          type="number"
          min="0"
          max="400"
          value={weight}
          placeholder="weight"
        ></input>
        <input
          required="No Input Inserted!"
          onChange={changeInputHandler}
          className="height"
          type="number"
          max="300"
          value={height}
          placeholder="height"
        ></input>
        <select
          value={activity}
          className="activity"
          onChange={changeInputHandler}
        >
          <option value="sedentary">Sedentary: little to no oxercise</option>
          <option value="light">Light: 1-3 times/week</option>
          <option value="moderate">Moderate: 4-5 times/week</option>
          <option value="extraActive">
            Extra Active: very intense exercise daily
          </option>
        </select>
        <input
          required="No Input Inserted!"
          value={targetWeight}
          onChange={changeInputHandler}
          className="targetWeight"
          placeholder="weight target"
          min="0"
          max="150"
        ></input>
        <button>Add</button>{' '}
        <button type="button" onClick={clickHandler} color="danger">
          Cancel
        </button>
      </form>
    </>
  );
};

export default EditProfile;
