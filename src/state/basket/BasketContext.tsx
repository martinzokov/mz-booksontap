import React, {createContext, useReducer, ReactNode, useEffect} from 'react';
import BooksReducer from './BasketReducer';
import { BasketActionTypes, IAddToBasketAction, IClearBasketAction } from './actionTypes';
import { Book } from '../../models/Book';

export interface BasketItem{
    book: Book,
    quantity: number
}

export interface BasketState{
    basket: BasketItem[],
    addToBasket: (book: Book, quantity: number) => void,
    clearBasket: () => void,
}

export const initialState: BasketState = {
    basket: [],
    addToBasket: (book: Book, quantity: number) => {},
    clearBasket: () => {}
}

export const BasketContext = createContext<BasketState>(initialState);

export interface Props {
    children?: ReactNode
}

export const basketStorageKey = "basket";

export const BasketProvider = (props: Props) =>{
    const storedContent = JSON.parse(localStorage.getItem(basketStorageKey) || "") as BasketState;
    let chooseState: BasketState;
    if(storedContent.basket){
        chooseState = storedContent;
    }else{
        chooseState = initialState;
    }

    const [state, dispatch] = useReducer(BooksReducer, chooseState);
    
    function addToBasket(book: Book, quantity: number){
        const addAction: IAddToBasketAction={
            type: BasketActionTypes.ADD_TO_BASKET,
            payload: {book: book, quantity: quantity}
        };
        dispatch(addAction);
    }
    function clearBasket(){
        const clearAction: IClearBasketAction={
            type: BasketActionTypes.CLEAR_BASKET
        };
        dispatch(clearAction);
    }

    useEffect(() => {
        localStorage.setItem(basketStorageKey, JSON.stringify(state));
      }, [state]);
    
    
    return (
        //<BasketContext.Provider value={{basket: state.basket, addToBasket}}>
        <BasketContext.Provider value={{...state, addToBasket, clearBasket}}>
            {props.children}
        </BasketContext.Provider>
    )
}