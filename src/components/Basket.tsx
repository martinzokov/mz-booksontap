import React, {useContext} from 'react';
import {ShoppingCartOutlined} from '@ant-design/icons';
import {Popover, Divider} from 'antd';
import { BasketContext } from '../state/basket/BasketContext';
import {Typography, Button, message} from  'antd';
const {Text} = Typography;

export const Basket = () => {
    const {basket, clearBasket} = useContext(BasketContext);

    const handleCheckoutClick = () =>{
        message.success("Purchase successful");
        clearBasket();
    }

    return (
        <Popover title="Your Basket" 
        content={<>
                    {basket.map((item)=>(
                        <div key={item.book.id}>{item.quantity} x {item.book.title}</div>
                    ))}
                    <Divider></Divider>
                    <Text strong>Total: £{basket.reduce((total, item)=>(total+ (item.book.price * item.quantity)), 0)}</Text>
                    <Button onClick={handleCheckoutClick} size="small">Checkout</Button>
                </>}>
        <ShoppingCartOutlined style={{ fontSize: '28px', color: 'white', padding:'0.3em' }}/>
        </Popover>
    )
}
