import React from 'react'

const NewRecipeForm = ({newRecipe, hideRecipeForm, onUpdateForm}) => {
    return (
<div className='recipe-details'>
      <div className='recipe-form'>
        <h2>New Recipe</h2>
        <button className='cancel-button' onClick={hideRecipeForm}>Cancel</button>
 
        <form>
          <label htmlFor="title">Title</label>
          <input 
          id="title" 
          type='text' 
          name='title' 
          value={NewRecipeForm.ingredients} 
          placeholder='Enter recipe name'
          required 
          />
 
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            id="ingredients"
            name='ingredients'
            value={newRecipe.ingredients}
            onChange={(e) => onUpdateForm(e)}
            required
            placeholder='Add ingredients separated by commas - i.e. Flour, sugar, almonds'
          />
 
          <label htmlFor="instructions">Instructions</label>
          <textarea 
          id="instruction" 
          name='instructions' 
          value={NewRecipeForm.instructions} 
          onChange={(e) => onUpdateForm(e)} 
          placeholder='Enter Instructions here'
          required 
          />
 
          <label htmlFor="description">Description</label>
          <textarea 
          id="description" 
          name='description' 
          value={NewRecipeForm.description} 
          onChange={(e) => onUpdateForm(e)} 
          placeholder='Enter a brief description of the recipe'
          required 
          />
 
          <label htmlFor="image">Image</label>
          <input 
          id="image" 
          type='text' 
          name='image_url' 
          value={NewRecipeForm.image_url} 
          onChange={(e) => onUpdateForm(e)} 
          placeholder='Enter image URL..'
          required 
          />
 
          <label htmlFor="servings">Servings</label>
          <input 
          id="servings" 
          type='number' 
          name='servings' 
          value={NewRecipeForm.servings} 
          onChange={(e) => onUpdateForm(e)} 
          placeholder='Servings here..'
          required 
          />
 
          <button type='submit'>Save Recipe</button>
        </form>
      </div>
    </div>
  );
};


export default NewRecipeForm;