import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Função para adicionar item ao carrinho
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      // Se o produto já existir no carrinho, aumente a quantidade
      existingProduct.quantity += 1;
      setCart([...cart]);
    } else {
      // Caso contrário, adicione o produto ao carrinho
      setCart([...cart, product]);
    }
  };

  // Função para calcular o total do carrinho
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.preco_produto * item.quantity), 0).toFixed(2);
};


  return (
    <CartContext.Provider value={{ cart, addToCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};
