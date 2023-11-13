import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <div className="home-container">
      <h1>Saved Recipes</h1>
      <ul className="home-elements">
        {savedRecipes.map((recipe) => (
          <li className="single-element" key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <div className="ingredient-list">
              <ul>
                {recipe.ingredients.map((ingredient, idx) => (
                  <li key={idx}> - {ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
