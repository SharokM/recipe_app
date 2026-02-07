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

  const onUpdateForm = (e) => {
    const {name, value} = e.target;
    setNewRecipe({...newRecipe, [name]: value})
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
      handleUnselectedRecipe={handleUnselectedRecipe}/>}
      
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
