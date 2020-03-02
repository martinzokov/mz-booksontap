import { IAddBookAction, BooksActionTypes } from './actionTypes';
import {BookState} from './BooksContext';
import IAction from '../actionTypes';
import {initialState} from './BooksContext';

export default (state: BookState, action: IAction): BookState => {
    switch(action.type){
        case BooksActionTypes.CLEAR_BOOKS:
            return initialState;
        case BooksActionTypes.ADD_BOOK:
            const {payload} = action as IAddBookAction;
            if(payload){
                return {
                    ...state,
                    books: [action.payload, ...state.books]
                }
            }else{
                return state;
            }
        default:
            return state;
    }
}

