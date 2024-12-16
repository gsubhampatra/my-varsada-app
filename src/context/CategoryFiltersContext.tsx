import { createContext, useContext, useState } from 'react';
import { Filter } from '../types/productTypes';

// Context for Category
const CategoryFilterContext = createContext<{
  categoryFilters?: Filter;
  setCategoryFilters: React.Dispatch<React.SetStateAction<Filter | undefined>>;
} | null>(null);

// Provider/wrapper
export const CategoryFilterProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [categoryFilters, setCategoryFilters] = useState<Filter>();

  return (
    <CategoryFilterContext.Provider
      value={{ categoryFilters, setCategoryFilters }}
    >
      {children}
    </CategoryFilterContext.Provider>
  );
};

// hook
export const useCategoryFilter = () => {
  const context = useContext(CategoryFilterContext);
  if (!context) {
    throw new Error(
      'useCategoryFilter must be used within a CategoryFilterProvider'
    );
  }
  return context;
};
