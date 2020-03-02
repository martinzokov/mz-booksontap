import { Book } from '../models/Book';
import React from 'react'
import styled from 'styled-components'
import { Card, Row, Col, Typography } from 'antd';
import moment from 'moment';

const { Title, Paragraph } = Typography;

type BookListItemProps = {
    book: Book
}

const SmallImage = styled.img`
max-width: 100%;
height: auto;
`;
const BookListItem = ({book}: BookListItemProps) =>{
    const authorString = "by "+ book.author.firstName+ " "+ book.author.lastName;
    
    const tomorrow = moment(new Date()).add(1, 'days');

    return (
        <Card key={book.id} 
        hoverable
        style={{  marginBottom: 15 }} 
        title={book.title}
        extra={authorString}>
        <Row>
            <Col xs={6}><SmallImage src={book.thumbnail}></SmallImage></Col>
            <Col xs={16} offset={1}><Title level={4}>Paperback</Title>
            <Title level={4}>£{book.price}</Title> 
            <Paragraph>Get it tomorrow, {tomorrow.format("DD MMM YYYY")}</Paragraph> 
            </Col>
            </Row>
        </Card>
    )
}

export default BookListItem