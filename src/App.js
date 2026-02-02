import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import "./App.css";

function App() {

  const [recipes, setRecipes] = useState([]);


  const fetchData = async () => {
    try {
      const response = await fetch("/api/recipes")
      const data = await response.json()
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      console.log("Using fallback data.");
    }
  }

  useEffect(()=> {
    // code 
  }, [fetchData]);

  return (
    <div className='recipe-app'>
      <Header />
      <p>Your recipes here! </p>
    </div>
  );
}

export default App;
