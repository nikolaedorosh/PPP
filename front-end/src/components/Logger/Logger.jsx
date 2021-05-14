import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  ReferenceLine,
  ComposedChart,
  Area
} from 'recharts';
import { getUsersThunk } from '../../redux/actionCreators/graphicsAC';
import styles from '../Logger/logger.module.css';

function Logger() {
  const dispatch = useDispatch();
  const graphics = useSelector((state) => state.graphics);
  const [graf, setGraf] = useState(true);
  // const changeStatusHandler = () =>{
  //   const changeStatusAction = {type:CHANGE_KCAL }
  //   console.log(changeStatusAction , 'changeStatusAction')
  //   dispatch(changeStatusAction)
  // }

  const changeStatusHandler = (e) => {
    e.preventDefault();
    setGraf((prev) => (prev = !prev));
  };

  const addNameHandler = () => {
    console.log('ya tut');
    dispatch(getUsersThunk());
  };

  return (
    <>
      <div className={styles.container}>
        <div className="line-diagram">
          <LineChart
            width={730}
            height={250}
            data={graphics}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="fatsNow" stroke="#8884d8" />
            <Line type="monotone" dataKey="kcalNow" stroke="#82ca9d" />
          </LineChart>
        </div>

        <div className="cube-diagram">
          {graf ? (
            // <BarChart width={730} height={250} data={graphics}>
            //     <CartesianGrid strokeDasharray="3 3" />
            //     <XAxis dataKey="day" />
            //     <YAxis />
            //     <Tooltip />
            //     <Legend />
            //     <Bar
            //       dataKey="kcalNow"
            //       barSize={40}
            //       stackId="a"
            //       fill="#80ff00"
            //     />
            //     <Bar dataKey="need" stackId="a" fill="#ff0000" />
            //     <Line type="monotone" dataKey="need" stroke="#ff7300" />
            //     {/* <ReferenceLine
            //       y={graphics.need}
            //       label="Max"
            //       stroke="red"
            //       strokeDasharray="3 3"
            //     /> */}
            //   </BarChart>
            
            <ComposedChart width={730} height={250} data={graphics} >
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid stroke="#f5f5f5" />
              <Bar dataKey="need"  stackId="a" barSize={40} fill="green" />
              <Line type='monotoneX' dot={{ stroke: 'red', strokeWidth: 4 ,r:5 }} dataKey="kcalNow" stroke="blue" />
            </ComposedChart>
          ) : (
            <BarChart width={730} height={250} data={graphics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="weigthKG" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="fatsNow" fill="#e60000" />
              <Bar dataKey="ProteinsNow" fill="#ff33ff" />
              <Bar dataKey="carbohydratesNow" fill="#3333ff" />
            </BarChart>
          )}
          <button onClick={changeStatusHandler}>Kcal/Stats</button>
          <button onClick={addNameHandler}>Показать прогресс</button>
        </div>
      </div>
    </>
  );
}

export default Logger;
