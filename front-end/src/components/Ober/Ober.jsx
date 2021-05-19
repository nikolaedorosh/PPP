import React from 'react';
import {useSelector } from 'react-redux';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box } from '@material-ui/core';
// import Title from './Title';

// Generate Order Data
function createData(id, date, name, kcal, prot, carboh , fats) {
  return { id, date, name, kcal, prot, carboh  ,fats};
}

const rows = [
  createData(0, '16 Mar, 2019', 'Cake', '1000', '10000', "10000" , 5000),
  createData(1, '16 Mar, 2019', 'Carrot', '2000', '10000', "10005" , 1000),
  createData(2, '16 Mar, 2019', 'apple', '30000', '100000', "1000" , 1000),
  createData(3, '16 Mar, 2019', 'Milk', '5000', '50000', "10000", 1000),
  createData(4, '15 Mar, 2019', 'Meat', '60000', '60000', "10000" , 1000)
];



const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));


function Orders() {
  const classes = useStyles();
  const week = useSelector((state) => state.week);
  console.log(week , ' week from order')
  return (
    <React.Fragment>
      <Box>

      {/* <Title>Recent Orders</Title> */}
      
          </Box>

    </React.Fragment>
  );
}


export default Orders
