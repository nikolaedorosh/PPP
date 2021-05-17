import React, { useEffect, useState } from "react";
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
import { getUsersThunk } from "../../redux/actionCreators/graphicsAC";
import styles from "../Logger/logger.module.css";

function Logger() {
  const dispatch = useDispatch();
  const graphics = useSelector((state) => state.graphics);
  const meal = useSelector((state) => state.meal);

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [meal]);

  let graphics_target = graphics.map((el) => el.info);
  let graphics_need = graphics.map((el) => el.need);

  let result = [
    {
      ...graphics_target[graphics_target.length - 1],
      ...graphics_need[graphics_need.length - 1],
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className='line-diagram'>
          <h5> Ваше кол-во элементов на неделю:</h5>
          <LineChart
            width={530}
            height={250}
            data={graphics_target}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='' stroke='#999' />
            <XAxis dataKey='day' stroke='red'>
              <Label value='On week' position='insideBottom' />
            </XAxis>
            <YAxis stroke='red' />
            <Tooltip />
            <Legend
              layout='horizontal'
              align='right'
              verticalAlign='bottom'
              iconType='line'
            />
            <Line
              type='monotone'
              dataKey='targetKcal'
              stroke='#ffd500'
              strokeWidth={4}
            />
            <Line
              type='monotone'
              dataKey='targetFats'
              stroke='#73ff00'
              strokeWidth={2}
            />
            <Line
              type='monotone'
              dataKey='targetProteins'
              stroke='#0004ff'
              strokeWidth={2}
            />
            <Line
              type='monotone'
              dataKey='targetCarbohydrates'
              stroke='#00fbff'
              strokeWidth={2}
            />
          </LineChart>
        </div>

        <div className='cube-diagram'>
          <h5> Ваше кол-во элементов на день:</h5>
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

            <Bar dataKey='targetKcal' barSize={40} fill='red' />
            <Bar
              dataKey='needKcal'
              barSize={40}
              fill='red'
              isAnimationActive={false}
            >
              <LabelList dataKey='needKcal' position='top' fill='#ffffff' />
            </Bar>

            <Bar dataKey='targetProteins' barSize={40} fill='#0004ff'></Bar>
            <Bar
              dataKey='needProt'
              barSize={40}
              fill='#0004ff'
              isAnimationActive={false}
            >
              <LabelList dataKey='needProt' position='top' fill='#ffffff' />
            </Bar>

            <Bar dataKey='targetCarbohydrates' barSize={40} fill='#00fbff' />
            <Bar
              dataKey='needCarboh'
              barSize={40}
              fill='#00fbff'
              isAnimationActive={false}
            >
              <LabelList dataKey='needCarboh' position='top' fill='#ffffff' />
            </Bar>

            <Bar dataKey='targetFats' barSize={40} fill='#73ff00' />
            <Bar
              dataKey='needFast'
              barSize={40}
              fill='#73ff00'
              isAnimationActive={false}
            >
              <LabelList dataKey='needFast' position='top' fill='#ffffff' />
            </Bar>
          </BarChart>
        </div>
      </div>
    </>
  );
}

export default Logger;
