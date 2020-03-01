import React, {useState, useContext} from 'react';
import {Col, Row, Typography, Select, Button, Divider, message} from 'antd';
import {Book} from '../models/Book';
import { BasketContext } from '../state/basket/BasketContext';

const { Option } = Select;
const {Title, Text} = Typography;

interface PurchaseProps{
    book: Book
}

const PurchaseBook = ({book}: PurchaseProps) => {
    const {basket, addToBasket} = useContext(BasketContext);
    const isInStock = book.stockAmount > 0;

    const maxQuantity = book.stockAmount < 20 ? book.stockAmount : 20;
    const numRange = new Array<number>(maxQuantity);
    for(let i = 0; i < maxQuantity; i++){
        numRange.push(i+1);
    }

    const [quantity, setQuantity] = useState<number>(1);
    const handleQuantitySelect = (value: any) =>{
        let quantity = parseInt(value);
        setQuantity(quantity);
    }

    const handleAddToBasketClick = () => {
        const existsInBasket = basket.filter(e => e.book.id === book.id).length > 0;
        if (existsInBasket){
            const quantityInBasket = basket.filter(e => e.book.id === book.id)[0].quantity;
            if(quantity + quantityInBasket > book.stockAmount){
                message.warning("Not enough stock");
            }else{
                addToBasket(book, quantity);
                message.success("Added to basket");
            }
        }else{
            addToBasket(book, quantity);
            message.success("Added to basket");
        }
    }

    if(isInStock){
        return (
            <Col offset={1}>
              <Row>
                <Title level={4}>Buy now</Title>
              </Row>
              <Row>
                  <Text>Free Delivery</Text>
              </Row>
              <Row>
                  <Text strong>Price: £{book.price}</Text>
              </Row>
              <Row>
                Select quantity:         
                <Select defaultValue={1} onChange={handleQuantitySelect}>
                    {numRange.map(num => (
                        <Option key={num} value={num}>
                        {num}
                        </Option>
                    ))}
                </Select>
              </Row>
              <Divider/>
              <Button onClick={handleAddToBasketClick}>Add to basket</Button>
            </Col>
        )
    }else{
        return (
            <Col offset={1}>
              <Title level={4}>Out of stock</Title>
              <Text>We'll let you know when it's back in stock</Text>
            </Col>
        )
    }
}

export default PurchaseBook;