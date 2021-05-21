import { useEffect, useRef, useState } from "react";
import React from "react";
import Item from "../Item/Item";
import Meal from "../Meal/Meal";
import RandomBurger from "../RandomBurger/RandomBurger";
import BounceLoader from "react-spinners/BounceLoader";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { scanPicChange } from "../../redux/actionCreators/graphicsAC";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMeal } from "../../redux/actionCreators/mealAC";
import { changeTextSaga } from "../../redux/saga";
import * as TYPES from "../../redux/types/types";

import { Box, Paper, Typography } from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import style from "./list.module.css";
const useStyles = makeStyles((theme) => ({
  table: {
    margin: "40px 40px",
    // width: '100%',
    // margin: '0, 200px',
    // marginRight: '200px',
    // display:'flex',
    // justifyContent: 'center'
  },
  paper: {
    backgroundColor: '#f3f3f3',
    padding: '18px 0px',
    opacity: '0.7'
  },
  button: {
    marginTop: "30px",
    width: "200px",
  },
  button2: {
    display: "flex",
    justifyContent: "center",
    paddingRight: 36,
    padding: "40px 0px 0px 0",
  },
  textForTable: {
    fontSize: 18,
  },
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
    setText("");
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
    setText("");
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
    data.append("scan-pic", img);

    let response = await fetch(`http://localhost:3000/scannedUpload/${id}`, {
      method: "POST",
      body: data,
    });
    response = await response.json();
    console.log("pic comes back from back >>>", response);
    dispatch(scanPicChange(response));
  };

  const picHandler = () => {
    inputRef.current.click();
  };
  // const newImg = (param) => `/img/${param}`;

  return (
    <>
      <Box className={classes.button2}>
        <Tooltip title='Add meal' placement='bottom'>
          <Button className={style.glow} onClick={clickHandler}>
            <Typography variant='button' style={{ fontWeight: "bold" }}>
              Create meal
            </Typography>
          </Button>
        </Tooltip>
      </Box>

      <Modal toggle={clickHandler} isOpen={open}>
        <Form inline>
          <ModalHeader>
            <div>
              <Button onClick={tabClickHandler} type='button'>
                {!scan ? "Search Recipe" : "Search Meal"}
              </Button>
            </div>
          </ModalHeader>
          <ModalBody>
            <BounceLoader
              color="#A3526C"
              size={150}
              loading={loading}
              css={{
                zIndex: '100',
                position: 'absolute',
                margin: '30%',
                marginTop: '45%',
              }}
            />
            {!scan ? (
              <>
                <h4
                  style={{
                    color: "rgb(35 74 78)",
                    padding: "6px 0px 10px 3px",
                  }}
                >
                  Search food:
                </h4>
                <FormGroup style={{ paddingBottom: "12px" }}>
                  <Input
                    onChange={changeText}
                    placeholder='2 apples, 100 grams of rice, two cups of milk'
                    value={text ? text : ""}
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
                <RandomBurger />
                <input
                  type='file'
                  id='fileUploader'
                  hidden='hidden'
                  ref={inputRef}
                  onChange={uploadOnChange}
                />
                {/* <IconButton onClick={picHandler} className="button">
                    <EditIcon />
                  </IconButton> */}
              </>
            )}
          </ModalBody>
          <ModalFooter>
            {scan? "" :
            <Button type="button" onClick={createMeal} style={{ backgroundColor:'#427276'}}>
              Add Meal
            </Button>
            }{' '}
            <Button type="button" onClick={clickHandler} style={{backgroundColor:'rgb(218 92 61)'}}>
              {!scan? "Cancel" : "Exit"}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Box className={classes.table}>
        <Paper elevation={5} variant='outlined' className={classes.paper}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell className={classes.textForTable}>Date:</TableCell>
                <TableCell className={classes.textForTable}>Name:</TableCell>
                <TableCell className={classes.textForTable}>
                  Proteins:
                </TableCell>
                <TableCell className={classes.textForTable}>Fats:</TableCell>
                <TableCell className={classes.textForTable}>
                  Carbohydrates:
                </TableCell>
                <TableCell className={classes.textForTable}>Kcal:</TableCell>
                <TableCell align='right'></TableCell>
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
