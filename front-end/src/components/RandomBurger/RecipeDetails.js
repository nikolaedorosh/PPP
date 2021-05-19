import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const RecipeDetails = (digests) => {
  return (
    <ul key={uuidv4()} className='ingredient-list'>
      <h5>Nutrients</h5>
      <li className='ingredient-text'>kCal -{digests.calories}</li>
      <li className='ingredient-text'>Carbs -{digests.ingredients[1].total}</li>
      <li className='ingredient-text'>Fat -{digests.ingredients[0].total}</li>
      <li className='ingredient-weight'>
        Protein - {digests.ingredients[2].total}
      </li>
    </ul>
  );
};

export default RecipeDetails;
