import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { listProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = ({match}) => {
  const keyword=match.params.keyword;
  const pageNumber=match.params.pageNumber || 1;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProduct(keyword,pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productList = useSelector((state) => state.productList);
  const { isLoading, error, products,page, pages } = productList;
  return (
    <>
      <Meta/>
      <h1>Latest Product</h1>
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
        {!keyword && <ProductCarousel/>}  
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
        </>
      )}
    </>
  );
};

export default HomeScreen;
