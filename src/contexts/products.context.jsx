import { createContext, useState } from "react";

import PRODUCTS_DATA from "../shop-data.json";

export const ProductsContext = createContext({
  products: [],
  setProductsData: () => null,
});

export const ProductsProvider = ({ children }) => {
  const [products, setProductsData] = useState(PRODUCTS_DATA);

  const value = { products, setProductsData };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
