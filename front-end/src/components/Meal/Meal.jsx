import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { sendMeal } from '../../redux/actionCreators/mealAC';
import { useDispatch } from 'react-redux';
import Item from '../Item/Item';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function Meal({ date, items, id }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const myDate = new Date(date);
  const dateStr = `${myDate.toLocaleDateString(
    'en-US'
  )} at ${myDate.toLocaleTimeString(['it-IT'], {
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  function deleteClickHandler(id) {
    dispatch(sendMeal(id));
  }

  function clickHandler() {
    setOpen((prev) => !prev);
  }

  let totalCarbohydrates = 0;
  let totalFats = 0;
  let totalKcal = 0;
  let totalProteins = 0;

  items.forEach((el) => {
    totalCarbohydrates += el.info.carb;
    totalFats += el.info.fat;
    totalKcal += el.info.cal;
    totalProteins += el.info.prot;
  });

  totalCarbohydrates = totalCarbohydrates.toFixed(2);
  totalFats = totalFats.toFixed(2);
  totalKcal = totalKcal.toFixed(2);
  totalProteins = totalProteins.toFixed(2);

  return (
    <>
          <TableCell>{date}</TableCell>
          <TableCell> <Button onClick={clickHandler}>
            {items[0].name}
            </Button></TableCell>
          <TableCell>{totalProteins}</TableCell>
          <TableCell>{totalFats}</TableCell>
          <TableCell>{totalCarbohydrates}</TableCell>
          <TableCell>{totalKcal}</TableCell>
          <TableCell> <Button onClick={() => deleteClickHandler(id)}>
            Delete
            </Button></TableCell>
          <Box>
        <Modal toggle={clickHandler} isOpen={open}>
          <ModalHeader>{dateStr}</ModalHeader>
          <ModalBody>
            {items.map((el) => (
              <Item
                image={el.image}
                Kcals={el.info.cal}
                proteins={el.info.prot}
                fats={el.info.fat}
                carbs={el.info.carb}
              />
            ))}
            <ModalFooter>
              <Button onClick={clickHandler}>Cancel</Button>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </Box>
    </>
  );
}

export default Meal;
