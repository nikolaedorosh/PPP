import { Spinner } from "reactstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getUserInfo, getUsersThunk } from "../../redux/actionCreators/graphicsAC";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

function Logger() {
  const week = useSelector((state) => state.week);
  const today = useSelector((state) => state.food.meals);
  const info = useSelector((state) => state.info);
  const id = useSelector((state) => state.auth.userId);

  const dispatch = useDispatch();
  let graphics_target;
  let graphics_need;
  let result;

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));

  useEffect(() => {
    dispatch(getUserInfo(id));
  }, []);

  useEffect(() => {
    dispatch(getUsersThunk(id));
  }, [today]);

  let newArr = [];

  let todayGraph = {
    carbohydrates: 0,
    fats: 0,
    proteins: 0,
    Kcalories: 0
  }

  graphics_need = {
    targetKCal: info.kcal,
    targetProt: info.Proteins,
    targetCarb: info.carbohydrates,
    targetFat: info.fats
  }

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

      if (new Date(acc.date).toLocaleDateString() !== new Date(el.date).toLocaleDateString()) {
        newArr.push(acc)
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
        }
      }
      if (i === week.length - 1) {
        newArr.push(acc)
      }
    })
    if (new Date(newArr[newArr.length - 1].date).toLocaleDateString() === new Date().toLocaleDateString()) {
      todayGraph = newArr[newArr.length - 1]
    }
  }

result = [
    {
      ...todayGraph,
      ...graphics_need,
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
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
            <YAxis stroke="red" />
            <Tooltip />
            <Legend
              layout="horizontal"
              align="right"
              verticalAlign="bottom"
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="Kcalories"
              stroke="#ffd500"
              strokeWidth={4}
            />
            <Line
              type="monotone"
              dataKey="fats"
              stroke="#73ff00"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="proteins"
              stroke="#0004ff"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="carbohydrates"
              stroke="#00fbff"
              strokeWidth={2}
            />
          </LineChart>
      </Grid>
      <Grid item xs={6}>
        <BarChart
          width={730}
          height={250}
          data={result}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          barCategoryGap='10%'
          barGap='10'
        >
          <XAxis dataKey='day'>
            <Label value='Current day' position='insideBottom' />
          </XAxis>
          <YAxis />
          <Tooltip />
          <Legend
            layout='vertical'
            align='left'
            verticalAlign='middle'
            iconType='rect'
          />
          <CartesianGrid stroke='#999' />

          <Bar dataKey='Kcalories' barSize={40} fill='#ffd500' />
          <Bar
            dataKey='targetKCal'
            barSize={40}
            fill='#ffd500'
            isAnimationActive={false}
          >
            <LabelList dataKey='targetKCal' position='top' fill='#ffffff' />
          </Bar>

          <Bar dataKey='proteins' barSize={40} fill='#0004ff'></Bar>
          <Bar
            dataKey='targetProt'
            barSize={40}
            fill='#0004ff'
            isAnimationActive={false}
          >
            <LabelList dataKey='targetProt' position='top' fill='#ffffff' />
          </Bar>

          <Bar dataKey='carbohydrates' barSize={40} fill='#00fbff' />
          <Bar
            dataKey='targetCarb'
            barSize={40}
            fill='#00fbff'
            isAnimationActive={false}
          >
            <LabelList dataKey='targetCarb' position='top' fill='#ffffff' />
          </Bar>

          <Bar dataKey='fats' barSize={40} fill='#73ff00' />
          <Bar
            dataKey='targetFat'
            barSize={40}
            fill='#73ff00'
            isAnimationActive={false}
          >
            <LabelList dataKey='targetFat' position='top' fill='#ffffff' />
          </Bar>
        </BarChart>
      </Grid>
    </Grid>
  );
}

export default Logger;
