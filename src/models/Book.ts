import { Author } from "./Author";

export interface Book{
    id: string;
    title: string;
    author: Author;
    price: number;
    description: string;
    stockAmount: number;
    thumbnail: string;
    isbn: string;
}

export interface BooksResponse{
    results: Book[];
}

export interface SingleBookResponse{
    results: Book;
}