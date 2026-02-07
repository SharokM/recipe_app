import { X } from "react-feather";
import EditForm from "./EditForm";
import { useState } from "react";

const ReceipeFull = ({selectedRecipe, handleSelectedRecipe, handleUnselectedRecipe, onUpdateForm, handleUpdateRecipe}) => {

    const [editiing, setEditing] = useState(false);

    const handleCancel = () => {
        setEditing(false);
    }
    return (
        <div className='recipe-details'>
                 {editiing ? (
                    <EditForm 
                    selectedRecipe={selectedRecipe} 
                    handleCancel={handleCancel} 
                    onUpdateForm={onUpdateForm}
                    handleUpdateRecipe={handleUpdateRecipe}
                    />
                ) : (        
        <article>
          <header>
            <figure>
              <img src={selectedRecipe.image_url} alt={selectedRecipe.title}/>
            </figure>
            <h2>{selectedRecipe.title}</h2>
            <div className='button-container'>
              <button className='edit-button' onClick={() => setEditing(true)}>Edit</button>
              <button className='cancel-button' onClick={handleUnselectedRecipe}>
               <X /> Close
              </button>
              <button className='delete-button'>Delete</button>
            </div>
          </header>

     
     
          <h3>Description:</h3>
          <p>{selectedRecipe.description}</p>
     
          <h3>Ingredients:</h3>
     
          <ul className='ingredient-list'>
            {selectedRecipe.ingredients.split(",").map((ingredient, index) => {
                return <li key={index}>{ingredient}</li>
            }
            )}
          </ul>

          <h3>Instructions:</h3>
     
          <pre className='formatted-text'>{selectedRecipe.instructions}</pre>
     
          <h3>Servings: {selectedRecipe.servings}</h3>
        </article>
    )}
    </div>
    )
}

export default ReceipeFull;