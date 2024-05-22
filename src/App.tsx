import React, { useEffect, useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Typography, Container, Box, Paper } from '@mui/material';
import { ldClient, ldConfig } from './launchDarklyConfig';
import { getRecipeSuggestions, generateRecipeImage, getRecipeSuggestionsWithImages } from './api/bedrockApi';
// import { getNutritionalAnalysis } from './api/convexApi';

import './App.css';

import { useQuery } from "convex/react";
import { api } from "./convex/_generated/api";


import { useFlags } from 'launchdarkly-react-client-sdk';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [recipeImage, setRecipeImage] = useState<string | null>(null);
  const [nutritionInfo, setNutritionInfo] = useState<any | null>(null);

  const tasks = useQuery(api.tasks.get);



  const { sampleFeature } = useFlags();



  const getRecipes = () => {
    if (sampleFeature) {
      fetchRecipeSuggestionsWithImages();
    } else {
      fetchRecipeSuggestions();
    }
  }

  const fetchRecipeSuggestions = async () => {
    if (ingredients.length > 0) {
      const suggestions = await getRecipeSuggestions(ingredients);
      setRecipes(suggestions);
    }
  };

  const fetchRecipeSuggestionsWithImages = async () => {
    if (ingredients.length > 0) {
      const suggestions = await getRecipeSuggestionsWithImages(ingredients);
      setRecipes(suggestions);
    }
  };

  const handleRecipeSelect = async (recipe: string) => {
    setSelectedRecipe(recipe);
    const imageUrl = await generateRecipeImage(recipe);
    setRecipeImage(imageUrl);

    // const nutrition = await getNutritionalAnalysis(recipe);
    // setNutritionInfo(nutrition);
  };

  return (
    <Container sx={{maxWidth: '800px'}} className='container-24'>
      <header className="App-header" style={{backgroundColor: sampleFeature ? '#00844B' : 'rgb(202 207 252)', marginBottom: '80px'}}>
          <p>The sampleFeature feature flag evaluates to <b>{sampleFeature ? 'True' : 'False'}</b></p>
      </header>
      

      <Typography variant="h4" textAlign="center" gutterBottom>Magic Recipe Cookbook</Typography>
      <Box mb={4} textAlign="center" >
        <TextField
          fullWidth
          variant="outlined"
          label="Enter ingredients"
          placeholder="e.g. chicken, rice, broccoli"
          onChange={(e) => setIngredients(e.target.value.split(','))}
        />
        <button onClick={getRecipes} className='button-34'>
          Get Recipes
        </button>
      </Box>
      {recipes.length > 0 && (
        <List>
          {recipes.map((recipe, index) => (
            <ListItem key={index} button onClick={() => handleRecipeSelect(recipe)}>
              <ListItemText primary={recipe} />
            </ListItem>
          ))}
        </List>
      )}
      {selectedRecipe && (
        <Box mt={4} component={Paper} p={2}>
          <Typography variant="h5">{selectedRecipe}</Typography>
          {recipeImage && <Box component="img" src={recipeImage} alt={selectedRecipe} mt={2} width="100%" />}
          {nutritionInfo && (
            <Box mt={2}>
              <Typography variant="h6">Nutritional Information</Typography>
              <Typography>Calories: {nutritionInfo.calories}</Typography>
              <Typography>Protein: {nutritionInfo.protein}g</Typography>
              <Typography>Fat: {nutritionInfo.fat}g</Typography>
              <Typography>Carbohydrates: {nutritionInfo.carbohydrates}g</Typography>
            </Box>
          )}
        </Box>
      )}

      Tasks
      {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
    </Container>
  );
};

export default App;
