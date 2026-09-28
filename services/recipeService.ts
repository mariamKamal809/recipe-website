import api from "./api";
import {
    Recipe,
    RecipesResponse,
    GetRecipesParams,
    SearchRecipesParams,
} from "@/types/recipe";

// Fetch a paginated and sorted list of recipes.
export const getRecipes = async (
    params: GetRecipesParams = {},
): Promise<RecipesResponse> => {
    const response = await api.get<RecipesResponse>("/recipes", { params });
    return response.data;
};

// Search recipes by name or keyword.
export const searchRecipes = async (
    params: SearchRecipesParams,
): Promise<RecipesResponse> => {
    const response = await api.get<RecipesResponse>("/recipes/search", {
        params,
    });
    return response.data;
};

// Fetch recipe tags used as cuisine and type category options.
export const getRecipeTags = async (): Promise<string[]> => {
    const response = await api.get<string[]>("/recipes/tags");
    return response.data;
};

// Fetch recipes matching a tag, such as Italian or Dessert.
export const getRecipesByTag = async (
    tag: string,
    params: GetRecipesParams = {},
): Promise<RecipesResponse> => {
    const response = await api.get<RecipesResponse>(
        `/recipes/tag/${encodeURIComponent(tag)}`,
        { params },
    );
    return response.data;
};

// Fetch recipes by meal type (breakfast, lunch, dinner, or snack).
export const getRecipesByMealType = async (
    mealType: string,
    params: GetRecipesParams = {},
): Promise<RecipesResponse> => {
    const response = await api.get<RecipesResponse>(
        `/recipes/meal-type/${encodeURIComponent(mealType)}`,
        { params },
    );
    return response.data;
};

// Fetch one recipe by ID for the recipe details page.
export const getRecipeById = async (id: number): Promise<Recipe> => {
    const response = await api.get<Recipe>(`/recipes/${id}`);
    return response.data;
};

// Fetch the total count, then choose a random recipe ID.
export const getRandomRecipeId = async (): Promise<number> => {
    const data = await getRecipes({ limit: 1 });
    const randomId = Math.floor(Math.random() * data.total) + 1;
    return randomId;
};
