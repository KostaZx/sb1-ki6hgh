import React, { createContext, useContext, useState } from 'react';
const CartContext = createContext(undefined);
export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [basketId, setBasketId] = useState(null);
    const addItem = (item) => {
        setItems(current => {
            const existing = current.find(i => i.id === item.id);
            if (existing) {
                return current.map(i => i.id === item.id
                    ? { ...i, quantity: i.quantity + item.quantity }
                    : i);
            }
            return [...current, item];
        });
    };
    const removeItem = (id) => {
        setItems(current => current.filter(item => item.id !== id));
    };
    const updateQuantity = (id, quantity) => {
        setItems(current => current.map(item => item.id === id ? { ...item, quantity } : item));
    };
    return (<CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            updateQuantity,
            basketId,
            setBasketId
        }}>
      {children}
    </CartContext.Provider>);
}
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
