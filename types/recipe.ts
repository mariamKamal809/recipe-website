// Recipe shape returned by DummyJSON.
export interface Recipe {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: "Easy" | "Medium" | "Hard";
    cuisine: string;
    caloriesPerServing: number;
    tags: string[];
    userId: number;
    image: string;
    rating: number;
    reviewCount: number;
    mealType: string[];
}

// Response shape for endpoints that return a recipe list.
export interface RecipesResponse {
    recipes: Recipe[];
    total: number;
    skip: number;
    limit: number;
}

// Sorting options supported by the API.
export type SortField = "rating" | "prepTimeMinutes" | "caloriesPerServing";
export type SortOrder = "asc" | "desc";

// Parameters for fetching a paginated and sorted recipe list.
export interface GetRecipesParams {
    limit?: number;
    skip?: number;
    sortBy?: SortField;
    order?: SortOrder;
}

// Search parameters, extending the list parameters with a query.
export interface SearchRecipesParams extends GetRecipesParams {
    q: string;
}

// Categories in the filter bar; tags and meal types use different endpoints.
export type CategoryKind = "tag" | "meal";

export interface Category {
    id: string; // "all" or a tag/meal type name expected by the API.
    label: string; // User-facing category label.
    emoji: string;
    kind: CategoryKind;
}

// Props for the recipe card component.
export interface RecipeCardProps {
    recipe: Recipe;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
}
