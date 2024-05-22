import axios from 'axios';

const bedrockEndpoint = 'YOUR_BEDROCK_API_ENDPOINT'; // replace with your Bedrock API endpoint

export const getRecipeSuggestions = async (ingredients: string[]): Promise<string[]> => {
  const response = await axios.post(`${bedrockEndpoint}/get-recipes`, { ingredients });
  return response.data.recipes;
};

export const getRecipeSuggestionsWithImages = async (ingredients: string[]): Promise<string[]> => {
  const response = await axios.post(`${bedrockEndpoint}/get-recipes-with-images`, { ingredients });
  return response.data.recipes;
};

export const generateRecipeImage = async (recipeName: string): Promise<string> => {
  const response = await axios.post(`${bedrockEndpoint}/generate-image`, { recipeName });
  return response.data.imageUrl;
};
