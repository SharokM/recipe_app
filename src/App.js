import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import "./App.css";
import RecipeExcerpt from "./components/RecipeExcerpt";
import ReceipeFull from "./components/RecipeFull";

function App() {

  const [recipes, setRecipes] = useState([]);

  const [selectedRecipe, setSelectedRecipe] = useState(null);

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

  return (
    <div className='recipe-app'>
      <Header />
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
