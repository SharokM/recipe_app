import React from "react";

const EditForm = ({selectedRecipe, handleCancel, onUpdateForm, handleUpdateRecipe}) => {

    return (
        <div className='recipe-form' onSubmit={(e) => handleUpdateRecipe(e, selectedRecipe)}>
          <h2>Edit "{selectedRecipe.title}"</h2>
          <button className='cancel-button' onClick={handleCancel}>Cancel</button>
          <form>
            <label htmlFor="title">Title</label>
            <input id="title" type='text' name='title' value={selectedRecipe.title} onChange={(e) => onUpdateForm(e, "update")} required />
            <label htmlFor="ingredients">Ingredients</label>
            <textarea id="ingredients" name='ingredients' value={selectedRecipe.ingredients} onChange={(e) => onUpdateForm(e, "update")} required />
            <label htmlFor="instructions">Instructions</label>
            <textarea id="instructions" name='instructions' value={selectedRecipe.instructions} onChange={(e) => onUpdateForm(e, "update")} required />
            <label htmlFor="description">Description</label>
            <textarea id="description" name='description' value={selectedRecipe.description} onChange={(e) => onUpdateForm(e, "update")} required />
            <label htmlFor="image">Image</label>
            <input id="image" type='text' name='image_url' value={selectedRecipe.image_url} onChange={(e) => onUpdateForm(e, "update")} required />
            <label htmlFor="servings">Servings</label>
            <input id="servings" type='number' name='servings' value={selectedRecipe.servings} onChange={(e) => onUpdateForm(e, "update")} required />
            <button type='submit'>Update Recipe</button>
          </form>
        </div>
      );
}

export default EditForm;