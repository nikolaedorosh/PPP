import { Button } from 'reactstrap';


function Item({ name, Kcals, proteins, fats, carbs, deleteItem}) {

  
  return (
    <div>
      {Kcals}/{proteins}/{fats}/{carbs}
      <Button onClick={() => deleteItem(name)} color="danger">Delete</Button>
      </div>
  );
}

export default Item;
