import { Book } from './../../models/Book';
import IAction from '../actionTypes';

export enum BooksActionTypes{
    ADD_BOOK = "@@books/ADD_BOOK",
    CLEAR_BOOKS = "@@books/CLEAR_BOOKS"
}

export interface IAddBookAction extends IAction{
    type: BooksActionTypes.ADD_BOOK,
    payload: Book
}

export interface IClearBooksAction extends IAction{
    type: BooksActionTypes.CLEAR_BOOKS
}