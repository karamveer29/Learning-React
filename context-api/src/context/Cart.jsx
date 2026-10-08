import { createContext, useState, useContext } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    return (
        <CartContext.Provider value={{ items, setItems }}>
            {props.children}
        </CartContext.Provider>
    );
};
