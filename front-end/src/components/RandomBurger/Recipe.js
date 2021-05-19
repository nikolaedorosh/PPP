import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeal } from "../../redux/actionCreators/mealAC";
import RecipeDetails from "./RecipeDetails";

const Recipe = ({ recipe }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { label, image, url, digest, calories } = recipe.recipe;
  const id = useSelector((state) => state.auth.userId);


  console.log(recipe)

  const addMeal = async () => {
    const myMeal = [{name: label, num: 1, image: url, info: {prot: digest[1].total, cal: calories, carb: digest[1].total, fat: digest[0].total}}]
    dispatch(getMeal(myMeal, id));
  };

  return (
    <div className='recipe'>
      <h2>{label}</h2>
      <img src={image} alt={label} />
      <a href={url} target='_blank' rel='noopener noreferrer'>
        URL
      </a>
      <button onClick={() => setShow(!show)}>Ingredients</button>
      <button onClick={addMeal}>Add Meal</button>
      {show && <RecipeDetails ingredients={digest} calories={calories} />}
    </div>
  );
};

export default Recipe;
