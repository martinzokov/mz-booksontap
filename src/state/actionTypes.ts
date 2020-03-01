import { BooksActionTypes } from "./books/actionTypes";
import { BasketActionTypes } from "./basket/actionTypes";

export default interface IAction {
    type: BooksActionTypes | BasketActionTypes,
    payload?: any
}