import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeDetails from "./RecipeDetails";

const Recipe = ({ recipe }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { label, image, url, digest, calories } = recipe.recipe;
  const [fat, setFat] = useState(Number);
  const [Kcal, setKcal] = useState(Number);
  const [proteins, setProteins] = useState(Number);
  const [carbs, setCarbs] = useState(Number);
  const [name, setName] = useState("");
  const id = useSelector((state) => state.auth.userId);

  const addMeal = async () => {
    setKcal(() => calories.toFixed(2));
    setCarbs(() => digest[1].total.toFixed(2));
    setProteins(() => digest[2].total.toFixed(2));
    setFat(() => digest[0].total.toFixed(2));
    setName(() => label);
    const num = 1;
    const info = { fat, Kcal, proteins, carbs };
    const data = [name, num, info];
    console.log(data);
    dispatch(getMeal({ data }, id));
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
