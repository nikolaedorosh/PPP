import { CardImg } from 'reactstrap';


function Item({image, Kcals, proteins, fats, carbs}) {

  
  return (
    <div>
      <CardImg style={{width:"15%"}} src={image} alt="food image" />
      {Kcals}/{proteins}/{fats}/{carbs}
      </div>
  );
}

export default Item;
