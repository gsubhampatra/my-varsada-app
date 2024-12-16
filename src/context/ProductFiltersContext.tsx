import { createContext, useContext, useState } from 'react';
import { Filter } from '../types/productTypes';

// Context for Product
const ProductFilterContext = createContext<{
  productFilters: Filter | undefined;
  setProductFilters: React.Dispatch<React.SetStateAction<Filter | undefined>>;
} | null>(null);

// Provider / Wrapper for Product
export const ProductFilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [productFilters, setProductFilters] = useState<Filter>();

  return (
    <ProductFilterContext.Provider
      value={{ productFilters, setProductFilters }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
};

// Custom hook for Product
export const useProductFilter = () => {
  const context = useContext(ProductFilterContext);
  if (!context) {
    throw new Error(
      'useProductFilter must be used within a ProductFilterProvider'
    );
  }
  return context;
};
