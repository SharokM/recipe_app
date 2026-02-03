import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import "./App.css";
import RecipeExcerpt from "./components/RecipeExcerpt";

function App() {

  const [recipes, setRecipes] = useState([]);

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

  return (
    <div className='recipe-app'>
      <Header />
      <div className="recipe-list">

      
      {recipes.map((recipe) => {
        return < RecipeExcerpt key={recipe.id} recipe={recipe} />
})}
      </div>
    </div>
  );
}

export default App;
