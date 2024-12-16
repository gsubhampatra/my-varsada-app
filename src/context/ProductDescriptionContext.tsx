import { createContext, useContext, useState } from 'react';

// Context for Category
const ProductDescriptionContext = createContext<{
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
  selectedColorId: string;
  setSelectedColorId: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

// Provider/wrapper
export const ProductDescriptionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColorId, setSelectedColorId] = useState<string>('');

  return (
    <ProductDescriptionContext.Provider
      value={{
        selectedSize,
        setSelectedSize,
        selectedColorId,
        setSelectedColorId,
      }}
    >
      {children}
    </ProductDescriptionContext.Provider>
  );
};

// custom hook
export const useProductDescriptionContext = () => {
  const context = useContext(ProductDescriptionContext);
  if (!context) {
    throw new Error(
      'useProductDescriptionContext must be used within a ProductDescriptionProvider'
    );
  }
  return context;
};
