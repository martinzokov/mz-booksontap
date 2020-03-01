import React, {createContext, useReducer, ReactNode} from 'react';
import BooksReducer from './BooksReducer';
import { IAddBookAction, IClearBooksAction } from './actionTypes';
import {BooksActionTypes} from '../books/actionTypes';
import { Book } from '../../models/Book';

export interface BookState{
    books: Book[],
    addBook: (book: Book) => void,
    clearBooks: () => void
}

export const initialState: BookState = {
    books: [],
    addBook: (book: Book) => {},
    clearBooks: () => {}
}

export const BooksContext = createContext<BookState>(initialState);

export interface Props {
    children?: ReactNode
  }
export const BooksProvider = (props: Props) =>{
    const [state, dispatch] = useReducer(BooksReducer, initialState);

    function addBook(book: Book){
        const addAction: IAddBookAction={
            type: BooksActionTypes.ADD_BOOK,
            payload: book
        };
        dispatch(addAction);
    }
    function clearBooks(){
        const clearAction: IClearBooksAction={
            type: BooksActionTypes.CLEAR_BOOKS
        };
        dispatch(clearAction);
    }

    return (
        <BooksContext.Provider value={{books: state.books, addBook, clearBooks}}>
            {props.children}
        </BooksContext.Provider>
    )
}