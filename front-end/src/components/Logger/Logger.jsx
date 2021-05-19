import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import RandomBurger from '../RandomBurger/RandomBurger';

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
} from 'recharts';
import {
  getUsersThunk,
  getUserInfo,
} from '../../redux/actionCreators/graphicsAC';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, Paper, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  boxes: {
    marginTop: 40,
  },
  typolog: {
    marginLeft: 220,
  },
  typolog2: {
    marginLeft: 390,
  },
  // paper: {
  //   backgroundColor: '#B6C6EB',
  // },
  styleForContainer:{
    display: 'flex',
    justifyContent:'center',
    marginTop: 40
  }
}));
function Logger() {
  const week = useSelector((state) => state.week);
  const today = useSelector((state) => state.food.meals);
  const info = useSelector((state) => state.info);
  const id = useSelector((state) => state.auth.userId);

  const dispatch = useDispatch();
  let graphics_target;
  let graphics_need;
  let result;
  const classes = useStyles();

  useEffect(() => {
    dispatch(getUsersThunk(id));
  }, [today]);

  let newArr = [];

  let todayGraph = {
    carbohydrates: 0,
    fats: 0,
    proteins: 0,

    Kcalories: 0,
  };

  graphics_need = {
    targetKCal: info.kcal,
    targetProt: info.Proteins,
    targetCarb: info.carbohydrates,
    targetFat: info.fats,
  };

  if (week.length) {
    let acc = {
      date: week[0].date,
      carbohydrates: 0,
      fats: 0,
      proteins: 0,
      Kcalories: 0,
    };
    week.forEach((el, i) => {
      let totalCarb = 0;
      let totalFat = 0;
      let totalProt = 0;
      let totalCal = 0;
      el.items.forEach((ele) => {
        const { carb, fat, prot, cal } = ele.info;
        totalCarb += carb;
        totalFat += fat;
        totalProt += prot;
        totalCal += cal;
      });

      if (
        new Date(acc.date).toLocaleDateString() !==
        new Date(el.date).toLocaleDateString()
      ) {
        newArr.push(acc);
        acc = {
          date: el.date,
          carbohydrates: totalCarb,
          fats: totalFat,
          proteins: totalProt,
          Kcalories: totalCal,
        };
      } else {
        acc = {
          ...acc,
          carbohydrates: acc.carbohydrates + totalCarb,
          fats: acc.fats + totalFat,
          proteins: acc.proteins + totalProt,
          Kcalories: acc.Kcalories + totalCal,
        };
      }
      if (i === week.length - 1) {
        newArr.push(acc);
      }
    });
    if (
      new Date(newArr[newArr.length - 1].date).toLocaleDateString() ===
      new Date().toLocaleDateString()
    ) {
      todayGraph = newArr[newArr.length - 1];
    }
  }

  graphics_target = newArr;

  result = [
    {
      ...todayGraph,
      ...graphics_need,
    },
  ];

  return (
    // <Grid container spacing={3} className={classes.greeds} >
    // <Grid item xs={6} className={classes.gridTest}>
  //  <Paper elevation={3} variant="outlined" className={classes.paper}>
    <Box className={classes.styleForContainer}>
      <Box>
        {/* <Paper elevation={3} variant="outlined" className={classes.paper}> */}
          <Typography className={classes.typolog}>Вывод за неделю:</Typography>
          <LineChart
            width={530}
            height={250}
            data={graphics_target}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="" stroke="#999" />
            <XAxis dataKey="day" stroke="red">
              <Label value="days" position="insideBottom" />
            </XAxis>
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="Kcalories"
              stroke="#F17455"
              strokeWidth={4}
            />
            <Line
              type="monotone"
              dataKey="fats"
              stroke="#776E18"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="proteins"
              stroke="#A3526C"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="carbohydrates"
              stroke="#EEC458"
              strokeWidth={2}
            />
          </LineChart>
        {/* </Paper> */}
      </Box>
      <Box>
        <Typography className={classes.typolog}>Вывод за day:</Typography>
        <BarChart
          width={730}
          height={250}
          data={result}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          barCategoryGap="10%"
          barGap="10"
        >
          <XAxis dataKey="day">
            <Label value="Current day" position="insideBottom" />
          </XAxis>
          <YAxis />
          <Tooltip />
          <Legend
            layout="vertical"
            align="left"
            verticalAlign="middle"
            iconType="rect"
          />
          <CartesianGrid stroke="#999" />

          <Bar dataKey="Kcalories" barSize={40} fill="#F17455" />
          <Bar
            dataKey="targetKCal"
            barSize={40}
            fill="#F4937B"
            isAnimationActive={false}
          >
          </Bar>

          <Bar dataKey="proteins" barSize={40} fill="#A3526C"></Bar>
          <Bar
            dataKey="targetProt"
            barSize={40}
            fill="#B46A81"
            isAnimationActive={false}
          >
          </Bar>

          <Bar dataKey="carbohydrates" barSize={40} fill="#A77C11" />
          <Bar
            dataKey="targetCarb"
            barSize={40}
            fill="#DFA616"
            isAnimationActive={false}
          >
          </Bar>

          <Bar dataKey="fats" barSize={40} fill="#776E18" />
          <Bar
            dataKey="targetFat"
            barSize={40}
            fill="#988C1F"
            isAnimationActive={false}
          >
          </Bar>
        </BarChart>
        {/* <RandomBurger /> */}
      </Box>
    </Box>
  );
}

export default Logger;
