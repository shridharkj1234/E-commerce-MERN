import React, {useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Button,
  Col,
  Image,
  Card,
  ListGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderAction";


const PlaceOrderScreen = ({history}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  //calculate Price
  cart.itemsPrice=cart.cartItems.reduce((acc,currItem)=>acc+currItem.qty*currItem.price,0);

  //calucalte shipping Price
  cart.shippingPrice=100;
  cart.taxPrice=20;
  cart.totalPrice=cart.itemsPrice+cart.shippingPrice+cart.taxPrice;
  const orderCreate=useSelector(state=>state.orderCreate);
  const {order,success,error}=orderCreate;

  useEffect(() => {
    if(success){
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history,success])

  const placeOrderHandler=(e)=>{
    dispatch(createOrder({
      orderItems:cart.cartItems,
      shippingAddress:cart.shippingAddress,
      paymentMethod:cart.paymentMethod,
      itemsPrice:cart.itemsPrice,
      shippingPrice:cart.shippingPrice,
      taxPrice:cart.shippingPrice,
      totalPrice:cart.totalPrice
    }))
  }
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city} ,
                {cart.shippingAddress.postalCode} ,
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                "Your Cart Is Empty"
              ) : (
                <ListGroup>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X {item.price}&#8377; ={" "}
                          {item.qty * item.price}&#8377;;
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items Price</Col>
                  <Col>{cart.itemsPrice}&#8377;</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{cart.shippingPrice}&#8377;</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>GST</Col>
                  <Col>{cart.taxPrice}&#8377;</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{cart.totalPrice}&#8377;</Col>
                </Row>
              </ListGroup.Item>
              {error && <Message variant='danger'>{error}</Message>}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >Place Order</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
