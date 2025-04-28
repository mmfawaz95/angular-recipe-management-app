  export interface Recipe {
    id: number;
    title: string;
    description: string;
    ingredients: string[];
    steps: string[];
    categoryId: number;
    userId: number;
    bookmarked: boolean;
  }
  