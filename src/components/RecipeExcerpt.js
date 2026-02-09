import React from 'react';
import { truncateText } from '../helpers/utilities';

const RecipeExcerpt = ({recipe, handleSelectedRecipe}) => {

    // const handleSelectedRecipeClick = () => {
    //     handleSelectedRecipe(recipe);
    // }

    return (
        <article className="recipe-card">
        <figure>
            <img src={recipe.image_url} alt={recipe.title} />
        </figure>
        <h2>{recipe.title}</h2>
        <p className="flex-spacing">Description: {truncateText(recipe.description, 30)}</p>
        <button onClick={() => handleSelectedRecipe(recipe)} >View Recipe</button>
        </article>
    )
}

export default RecipeExcerpt;