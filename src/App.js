import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import "./App.css";
import RecipeExcerpt from "./components/RecipeExcerpt";
import ReceipeFull from "./components/RecipeFull";
import NewRecipeForm from "./components/NewRecipeForm";

function App() {

  const [recipes, setRecipes] = useState([]);

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [newRecipe, setNewRecipe] = useState({
    
    title: "",
    ingredients: "",
    instructions: "",
    servings: 1, // conservative default
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

  const handleSelectedRecipe = (recipe) => {
    setSelectedRecipe(recipe)
  }

  const handleUnselectedRecipe = () => {
    setSelectedRecipe(null)
  }


  const hideRecipeForm = () => {
    showNewRecipeForm(false)
  }

  const showRecipeForm = () => {
    showNewRecipeForm(true)
    selectedRecipe(null)
  }

  return (
    <div className='recipe-app'>
      <Header />
      {showNewRecipeForm && <NewRecipeForm newRecipe={newRecipe} hideRecipeForm={hideRecipeForm} />}
      {selectedRecipe && 
      <ReceipeFull 
      selectedRecipe={selectedRecipe} 
      handleUnselectedRecipe={handleUnselectedRecipe}/>}
      
      {selectedRecipe ? null : <div className="recipe-list">
      {recipes.map((recipe) => {
        return < RecipeExcerpt 
        key={recipe.id} 
        recipe={recipe} 
        handleSelectedRecipe={handleSelectedRecipe}/>
})}
      </div>}

    </div>
  );
}

export default App;
