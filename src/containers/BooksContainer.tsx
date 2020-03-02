import React, { useContext, useEffect } from 'react';
import { BooksResponse } from '../models/Book';
import { getAllBooks } from '../external/BooksApiClient';
import {BooksContext} from '../state/books/BooksContext';
import BookListItem from '../components/BookListItem';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 1.5em;
`;

const BooksContainer = () =>{
  const {books, addBook, clearBooks} = useContext(BooksContext);
  
  useEffect(() => {
    getAllBooks().then(response => {
      clearBooks();
      const booksResponse: BooksResponse = response as BooksResponse;
      if(booksResponse){
        for(let book of booksResponse.results){
          addBook(book);
        }
      }
    })
  },[]);

  return (
    <Container>
      {books.map(book => (
        <Link key={book.id} to={"/books/"+book.id}>
          <BookListItem book={book}></BookListItem>
        </Link>
      ))}
    </Container>);
}

export default BooksContainer;