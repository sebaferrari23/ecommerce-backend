import {useState, createContext} from 'react'

export const Store = createContext();

const StoreProvider = ({children})=>{

    const [itemsCart, setItemsCart] = useState({
        items:[],
        count: 1,
        totalCart: 0,
        totalPrice: 0,
    });

    return(
        <Store.Provider
            value={{
                itemsCart,
                setItemsCart
            }}
        >
            {children}
        </Store.Provider>
    )
}

export default StoreProvider;