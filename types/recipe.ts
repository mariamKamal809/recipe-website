// شكل الوصفة الواحدة زي ما ترجعها dummyjson بالضبط
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

// شكل الرسبونس لأي إندبوينت يرجع لستة وصفات
export interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

// خيارات الفرز المدعومة فعلياً من الـ API
export type SortField = "rating" | "prepTimeMinutes" | "caloriesPerServing";
export type SortOrder = "asc" | "desc";

// باراميترز جلب لستة الوصفات (pagination + sort)
export interface GetRecipesParams {
  limit?: number;
  skip?: number;
  sortBy?: SortField;
  order?: SortOrder;
}

// باراميترز البحث — نفس الي فوق بس مع نص البحث
export interface SearchRecipesParams extends GetRecipesParams {
  q: string;
}

// كاتيكوري بشريط الفلترة — بعضها tag وبعضها mealType، كل وحدة إلها إندبوينت مختلف
export type CategoryKind = "tag" | "meal";

export interface Category {
  id: string; // "all" أو اسم التاك/الميل تايب زي ما يتوقعه الـ API
  label: string; // النص المعروض بالعربي
  emoji: string;
  kind: CategoryKind;
}

// نوع مستوى المكونات (props) لكومبوننت الكارد
export interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}
