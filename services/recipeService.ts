import api from "./api";
import {
  Recipe,
  RecipesResponse,
  GetRecipesParams,
  SearchRecipesParams,
} from "@/types/recipe";

// جلب لستة الوصفات مع pagination و فرز
export const getRecipes = async (
  params: GetRecipesParams = {}
): Promise<RecipesResponse> => {
  const response = await api.get<RecipesResponse>("/recipes", { params });
  return response.data;
};

// البحث عن وصفة بالاسم/الكلمة
export const searchRecipes = async (
  params: SearchRecipesParams
): Promise<RecipesResponse> => {
  const response = await api.get<RecipesResponse>("/recipes/search", {
    params,
  });
  return response.data;
};

// جلب لستة التاكات (نستخدمها كخيارات كاتيكوري "cuisine/type")
export const getRecipeTags = async (): Promise<string[]> => {
  const response = await api.get<string[]>("/recipes/tags");
  return response.data;
};

// جلب وصفات حسب تاك معين (مثلاً Italian, Dessert)
export const getRecipesByTag = async (
  tag: string,
  params: GetRecipesParams = {}
): Promise<RecipesResponse> => {
  const response = await api.get<RecipesResponse>(
    `/recipes/tag/${encodeURIComponent(tag)}`,
    { params }
  );
  return response.data;
};

// جلب وصفات حسب نوع الوجبة (breakfast/lunch/dinner/snack)
export const getRecipesByMealType = async (
  mealType: string,
  params: GetRecipesParams = {}
): Promise<RecipesResponse> => {
  const response = await api.get<RecipesResponse>(
    `/recipes/meal-type/${encodeURIComponent(mealType)}`,
    { params }
  );
  return response.data;
};

// جلب وصفة وحدة بالـ id — تستخدم بصفحة التفاصيل
export const getRecipeById = async (id: number): Promise<Recipe> => {
  const response = await api.get<Recipe>(`/recipes/${id}`);
  return response.data;
};

// وصفة عشوائية: نجيب العدد الكلي أول، وبعدين نختار id عشوائي ضمنه
export const getRandomRecipeId = async (): Promise<number> => {
  const data = await getRecipes({ limit: 1 });
  const randomId = Math.floor(Math.random() * data.total) + 1;
  return randomId;
};
