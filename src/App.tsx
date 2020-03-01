import React from 'react';
import './App.css';
import {BooksProvider} from './state/books/BooksContext';
import BooksContainer from './containers/BooksContainer';
import 'antd/dist/antd.css';
import { Typography } from 'antd';
import { Row, Col } from 'antd';
import {Route, Link, Switch} from 'react-router-dom';
import BookDetails from './containers/BookDetails';
import { BasketProvider } from './state/basket/BasketContext';
import { Basket } from './components/Basket';

const { Title } = Typography;


function App() {
  return (
    <div>
      <BooksProvider>
        <BasketProvider>
          <Row className="header-row">
            <Col xs={0} md={6}></Col>
            <Col xs={22} md={10}>
                <Link to="/"><Title level={2}>The Amazing Book Shop</Title></Link>
            </Col>
            <Col xs={2}>
              <Basket></Basket>
            </Col>
            <Col xs={0} md={6}></Col>
          </Row>
          <Row>
          <Col xs={0} md={4}></Col>
          <Col className="content-area" xs={24} md={16}>
            <Switch>
              <Route path="/books/:bookId" component={BookDetails}/>
              <Route path="/" component={BooksContainer}/>
            </Switch>
          </Col>
          <Col xs={0} md={4}></Col>
          </Row>
        </BasketProvider>
      </BooksProvider>
    </div>
  );
}

export default App;
