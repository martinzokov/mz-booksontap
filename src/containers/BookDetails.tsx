import React, {useEffect, useState} from 'react'
import {getBook} from '../external/BooksApiClient';
import { useParams } from 'react-router';
import { Book, SingleBookResponse } from '../models/Book';
import 'antd/dist/antd.css';
import {Card, Row, Col} from 'antd';
import styled from 'styled-components';
import PurchaseBook from '../components/PurchaseBook';


const DetailsImage = styled.img`
max-width: 100%;
height: auto;
`;
const Container = styled.div`
  padding: 1.5em;
`;

const BookDetails = () => {
    let { bookId } = useParams();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        if(bookId){
            getBook(bookId).then( (response) => {
                const bookResponse: SingleBookResponse = response as SingleBookResponse;
                if(bookResponse.results){
                  setBook(bookResponse.results);
                }
              });
        }
      },[]);

      
    if(book){
        
        const authorString = "by "+ book.author.firstName+ " "+ book.author.lastName;
        return (
            <Container>
                <Card style={{  marginBottom: 15 }} 
                title={book.title}
                extra={authorString}>
                    <Row>
                        <Col lg={6}><DetailsImage src={book.thumbnail}/></Col>
                        <Col lg={11} offset={1}>{book.description}</Col>
                        <Col lg={6}><PurchaseBook book={book}></PurchaseBook></Col>
                    </Row>
                </Card>
            </Container>
        )
    } else{
        return(
            <></>
        )
    }
    
}


export default BookDetails;