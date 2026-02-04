import React from 'react'

const NewRecipeForm = ({newRecipe, hideRecipeForm}) => {
    return (
<div className='recipe-details'>
      <div className='recipe-form'>
        <h2>New Recipe</h2>
        <button className='cancel-button' onClick={hideRecipeForm}>Cancel</button>
 
        <form>
          <label htmlFor="title">Title</label>
          <input id="title" type='text' name='title' value='' onChange='' required />
 
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            id="ingredients"
            name='ingredients'
            value=''
            onChange=''
            required
            placeholder='Add ingredients separated by commas - i.e. Flour, sugar, almonds'
          />
 
          <label htmlFor="instructions">Instructions</label>
          <textarea id="instruction" name='instructions' value='' onChange='' required />
 
          <label htmlFor="description">Description</label>
          <textarea id="description" name='description' value='' onChange='' required />
 
          <label htmlFor="image">Image</label>
          <input id="image" type='text' name='image_url' value='' onChange='' required />
 
          <label htmlFor="servings">Servings</label>
          <input id="servings" type='number' name='servings' value='' onChange='' required />
 
          <button type='submit'>Save Recipe</button>
        </form>
      </div>
    </div>
  );
};


export default NewRecipeForm