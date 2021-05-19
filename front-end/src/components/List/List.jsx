import { useEffect, useRef, useState } from 'react';
import React from 'react';
import Item from '../Item/Item';
import Meal from '../Meal/Meal';
import BounceLoader from 'react-spinners/BounceLoader';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { scanPicChange } from '../../redux/actionCreators/graphicsAC';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMeal } from '../../redux/actionCreators/mealAC';
import { changeTextSaga } from '../../redux/saga';
import * as TYPES from '../../redux/types/types';

import { Box, Paper } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import style from './list.module.css';
const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: '40px',
    // width: '100%',
    marginLeft: '200px',
    marginRight: '200px',
    // display:'flex',
    // justifyContent: 'center'
  },
  paper: {
    backgroundColor: '#D8E7E9',
  },
  button: {
    marginTop: '30px',
    width: '200px',
  },
  button2:{
   display:'flex',
   justifyContent:'center',
   paddingRight:36
  }
}));

function List() {
  const inputRef = useRef(null);
  const scannerPic = useSelector((state) => state.food.scannedImg);
  const id = useSelector((state) => state.auth.userId);
  const options = useSelector((state) => state.food.options);
  const week = useSelector((state) => state.week);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [scan, setScan] = useState(false);
  const [text, setText] = useState(false);

  const classes = useStyles();

  function clickHandler() {
    setOpen((prev) => !prev);
    setText('');
    dispatch({
      type: TYPES.CHANGE_OPTIONS,
      payload: [],
    });
  }

  function tabClickHandler() {
    setScan((prev) => !prev);
  }

  useEffect(() => {
    if (text) {
      dispatch(changeTextSaga(text));
    }
  }, [text]);

  function changeText(e) {
    setText(e.target.value);
  }

  function createMeal(e) {
    // e.preventDefault();
    dispatch(getMeal(options, id));
    setOpen((prev) => !prev);
    setText('');
    dispatch({
      type: TYPES.CHANGE_OPTIONS,
      payload: [],
    });
  }

  //upload scanned pic
  const uploadOnChange = async (e) => {
    e.preventDefault();
    const img = e.target.files[0];
    const data = new FormData();
    // console.log({ img });
    data.append('scan-pic', img);

    let response = await fetch(`http://localhost:3000/scannedUpload/${id}`, {
      method: 'POST',
      body: data,
    });
    response = await response.json();
    console.log('pic comes back from back >>>', response);
    dispatch(scanPicChange(response));
  };

  const picHandler = () => {
    inputRef.current.click();
  };
  // const newImg = (param) => `/img/${param}`;

  return (
    <>
      <Box className={classes.button2}>
        <Tooltip title="Add meal" placement="bottom">
          <Button className={style.glow} onClick={clickHandler}>
            Eat
          </Button>
        </Tooltip>
      </Box>

      <Modal toggle={clickHandler} isOpen={open}>
        <Form inline>
          <ModalHeader>
            meal
            <div>
              <Button onClick={tabClickHandler} type="button">
                {scan ? 'Type' : 'Scan'}
              </Button>
            </div>
          </ModalHeader>
          <ModalBody>
            <BounceLoader
              color="blue"
              size={150}
              loading={loading}
              css={{
                zIndex: '100',
                position: 'absolute',
                margin: '35%',
                marginTop: '20%',
              }}
            />
            {!scan ? (
              <>
                <p>meals</p>
                <FormGroup>
                  <Input
                    onChange={changeText}
                    placeholder="search food example: 1 apple 100 grams of buckwheat"
                    value={text ? text : ''}
                  ></Input>
                </FormGroup>
                {options ? (
                  options.map((el) => (
                    <Item
                      num={el.num}
                      image={el.image}
                      Kcals={el.info.cal}
                      proteins={el.info.prot}
                      fats={el.info.fat}
                      carbs={el.info.carb}
                    />
                  ))
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {/* <RandomBurger/> */}
                {/* <h2>Scan your item!</h2>

                  <div>
                    <img
                      src={'/img/' + scannerPic}
                      width="200"
                      alt="scan-pic"
                    />
                  </div>

                  <input
                    type="file"
                    id="fileUploader"
                    hidden="hidden"
                    ref={inputRef}
                    onChange={uploadOnChange}
                  />
                  <IconButton onClick={picHandler} className="button">
                    <EditIcon />
                  </IconButton> */}
              </>
            )}
          </ModalBody>
          <ModalFooter>
            Kcals/proteins/fats/carbs
            <Button type="button" onClick={createMeal}>
              Add Meal
            </Button>{' '}
            <Button type="button" onClick={clickHandler} color="danger">
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Box className={classes.table}>
        <Paper elevation={5} variant="outlined" className={classes.paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date:</TableCell>
                <TableCell>Name:</TableCell>
                <TableCell>Proteins:</TableCell>
                <TableCell>Fats:</TableCell>
                <TableCell>Carbohydrates:</TableCell>
                <TableCell>Kcal:</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            {week.length ? (
              [...week].reverse().map((el) => (
                <TableBody>
                  <TableRow>
                    <Meal
                      key={Math.random()}
                      date={el.date}
                      items={el.items}
                      id={el._id}
                    />
                  </TableRow>
                </TableBody>
              ))
            ) : (
              <> </>
            )}
          </Table>
        </Paper>
      </Box>
    </>
  );
}

export default List;
