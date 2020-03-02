import axios, { AxiosInstance } from 'axios';
import { BooksResponse, SingleBookResponse } from '../models/Book';

const baseUrl = "https://booksontap.azurewebsites.net/api";
const booksEndpoint = baseUrl + "/books";

const session: AxiosInstance = axios.create({
    baseURL: baseUrl
});

export async function getAllBooks() {
    let response = await session.get<BooksResponse>(booksEndpoint).then(function (response) {
        // handle success
        return response.data;
        })
        .catch(function (error) {
        // handle error

        console.log(error);
        })
    
    return response;
}

export async function getBook(bookId: string) {
    let response = await session.get<SingleBookResponse>(`${booksEndpoint}/${bookId}`).then(function (response) {
        // handle success
        return response.data;
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
    
    return response;
}