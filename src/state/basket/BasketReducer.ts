import { IAddToBasketAction, BasketActionTypes } from './actionTypes';
import IAction from '../actionTypes';
import { BasketState, initialState, basketStorageKey } from './BasketContext';

export default (state: BasketState, action: IAction): BasketState => {
    if(action === null){
        localStorage.removeItem(basketStorageKey);
        return initialState;
    }
    
    switch(action.type){
        case BasketActionTypes.CLEAR_BASKET:
            return initialState;
            break;
        case BasketActionTypes.ADD_TO_BASKET:
                const {payload} = action as IAddToBasketAction;
                if(payload){
                    const existsInBasket = state.basket.filter(e => e.book.id === payload.book.id).length > 0;
                    if(existsInBasket){
                        const updatedBasket = state.basket.map(basketItem => {
                            const maxItems = basketItem.book.stockAmount;
                            let newQuantity = 0;
                            if(basketItem.quantity + payload.quantity >= maxItems){
                                newQuantity = maxItems;
                            }else{
                                newQuantity = basketItem.quantity + payload.quantity;
                            }
                            if(basketItem.book.id === payload.book.id){
                                return {...basketItem, quantity: newQuantity}
                            };
                            return basketItem;
                        });
                        return {...state, basket: updatedBasket};
                    }

                    return {
                        ...state,
                        basket: [action.payload, ...state.basket]
                    }
                }else{
                    return state;
                }
        default:
            return state;
    }
}

