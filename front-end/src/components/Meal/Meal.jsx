import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { sendMeal } from '../../redux/actionCreators/mealAC';
import { useDispatch } from 'react-redux';
import Item from '../Item/Item';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function Meal({ date, items }) {
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

  function deleteClickHandler(date) {
    dispatch(sendMeal(date));
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
      <Box>
        <Button onClick={clickHandler} variant="outlined" color="secondary">
          {items[0].name}...
          {totalKcal}/{totalProteins}/{totalFats}/{totalCarbohydrates}ы
          <Button
            onClick={() => deleteClickHandler(date)}
            variant="contained"
            color="secondary"
            size="small"
          >
            Delete
          </Button>
        </Button>

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

// <Button onClick={clickHandler} variant="outlined" color="secondary">
// {items[0].name}...
// {/* {totalKcal}/{totalProteins}/{totalFats}/{totalCarbohydrates} */}
// <Button
//   onClick={() => deleteClickHandler(date)}
//   variant="contained"
//   color="secondary"
//   size='small'
// >
//   Delete
// </Button>
// </Button>
// Card className={classes.root}>
//           <CardActionArea>
//             <CardMedia
//               className={classes.media}
//               image="/static/images/cards/contemplative-reptile.jpg"
//               title="Contemplative Reptile"
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="h2">
//                 {items[0].name}
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//           <CardActions>
//             <Button onClick={() => deleteClickHandler(date)}>Delete</Button>
//             <Button onClick={clickHandler} variant="outlined" color="secondary">
//               Learn More
//             </Button>
// </CardActions>
// </Card>
