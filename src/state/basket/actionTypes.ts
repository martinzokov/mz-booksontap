import IAction from '../actionTypes';
import { BasketItem } from './BasketContext';

export enum BasketActionTypes{
    ADD_TO_BASKET = "@@basket/ADD_TO_BASKET",
    CLEAR_BASKET = "@@basket/CLEAR_BASKET"
}

export interface IAddToBasketAction extends IAction{
    type: BasketActionTypes.ADD_TO_BASKET,
    payload: BasketItem
}

export interface IClearBasketAction extends IAction{
    type: BasketActionTypes.CLEAR_BASKET,
}