import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import "./App.css";
import RecipeExcerpt from "./components/RecipeExcerpt";
import RecipeFull from "./components/RecipeFull";
import NewRecipeForm from "./components/NewRecipeForm";

function App() {

  const [recipes, setRecipes] = useState([]);

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [newRecipe, setNewRecipe] = useState({
    
    title: "",
    ingredients: "",
    instructions: "",
    servings: 1, 
    description: "",
    image_url: "https://images.pexels.com/photos/9986228/pexels-photo-9986228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  
})

  const [showNewRecipeForm, setShowNewRecipeForm] = useState(false)

  useEffect(()=> {
    const fetchAllRecipes = async () => {
      try {
        const response = await fetch("/api/recipes")
        if (response.ok) {
          const data = await response.json()
          setRecipes(data);
        } else {
          console.log("Failed to fetch recipes, using fallback data."); 
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        console.log("Using fallback data.");
      }
    }
    fetchAllRecipes()
  }, []);


    const handleNewRecipe = async (e, newRecipe) => {
      e.preventDefault();
      try {
        const response = await fetch("/api/recipes", {
          method:"POST", 
          headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify(newRecipe),
        }
      )
      if (response.ok) {
        const data = await response.json();
        setRecipes([...recipes, data.recipe])
        setShowNewRecipeForm(false)
        setNewRecipe({
          title: "",
          ingredients: "",
          instructions: "",
          servings: 1,
          description: "",
          image_url: "https://images.pexels.com/photos/9986228/pexels-photo-9986228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        })
        console.log("New recipe added by user:", data.recipe)
      } else {
        console.log("Error, response not ok:", response.statusText);
      }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        console.log("Using fallback data.");
      }
    }


  const handleSelectedRecipe = (recipe) => {
    setSelectedRecipe(recipe)
  }

  const handleUnselectedRecipe = () => {
    setSelectedRecipe(null)
  }


  const hideRecipeForm = () => {
    setShowNewRecipeForm(false)
  }

  const showRecipeForm = () => {
    setShowNewRecipeForm(true)
    setSelectedRecipe(null)
  }

  // update form function to update form state as user types in form fields, takes an additional action parameter to determine whether to update newRecipe or selectedRecipe state based on which form is being updated
  const onUpdateForm = (e, action = "new") => {
    const {name, value} = e.target;
    if (action === "new") {
      setNewRecipe({...newRecipe, [name]: value})
    } else if (action === "update") {
      setSelectedRecipe({...selectedRecipe, [name]: value})
    }}
  
    // update recipe async function to send updated recipe data to backend and update state with new recipe data on success
    const handleUpdateRecipe = async (e, selectedRecipe) => {
      e.preventDefault();
      const {id} = selectedRecipe;
      try {
        const response = await fetch(`/api/recipes/${id}`, {
          method:"PUT", 
          headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify(selectedRecipe),
        }
      )
      if (response.ok) {
        const data = await response.json();
        setRecipes(recipes.map((recipe) => recipe.id === id ? data.recipe : recipe))
        setShowNewRecipeForm(false)
        setNewRecipe({
          title: "",
          ingredients: "",
          instructions: "",
          servings: 1,
          description: "",
          image_url: "https://images.pexels.com/photos/9986228/pexels-photo-9986228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        })
        console.log("Existing recipe updated by user:", data.recipe)
      } else {
        console.log("Error, response not ok:", response.statusText);
      }
      } catch (error) {
        console.error("Error updating recipes:", error);
        console.log("Update failed.");
      }
      setSelectedRecipe(null);
    }

    // delete recipe function 
    const handleDeleteRecipe = async (recipeId) => {
      try {
        const response = await fetch(`/api/recipes/${selectedRecipe.id}`, {
          method: "DELETE", 
        }
      )
      if (response.ok) {
        setRecipes(recipes.filter((recipe) => recipe.id !== recipeId))
        setSelectedRecipe(null)
        console.log("Existing recipe deleted by user:")
      } else {
        console.log("Error, delete not possible:");
      }
      } catch (error) {
        console.error("Error deleting recipe:", error);
        console.log("Delete failed.");
      }
    }
  

  return (
    <div className='recipe-app'>
      <Header showNewRecipeForm={showNewRecipeForm} showRecipeForm={showRecipeForm}/>
      {showNewRecipeForm && 
      <NewRecipeForm 
      newRecipe={newRecipe} 
      hideRecipeForm={hideRecipeForm} 
      onUpdateForm={onUpdateForm} 
      handleNewRecipe={handleNewRecipe} 
      />}
      {selectedRecipe && 
      <RecipeFull 
      selectedRecipe={selectedRecipe} 
      handleUnselectedRecipe={handleUnselectedRecipe}
      onUpdateForm={onUpdateForm}
      handleUpdateRecipe={handleUpdateRecipe}
      handleDeleteRecipe={handleDeleteRecipe}
      />
      }
      
      {selectedRecipe & showNewRecipeForm ? null : <div className="recipe-list">
      {recipes.map((recipe) => {
        return <RecipeExcerpt 
        key={recipe.id} 
        recipe={recipe} 
        handleSelectedRecipe={handleSelectedRecipe}/>
})}
      </div>}

    </div>
  );
}

export default App;
