import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetail,updateUser } from "../actions/userAction";
import { USER_UPDATE_RESET } from "../constants/userLoginConstants";

const UserEditScreen = ({ location, history, match }) => {
  const userId = match.params.id;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setisAdmin] = useState(false);

  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);
  const { isLoading, user, error } = userDetail;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { isLoading:loadingUpdate, success:successUpdate, error:errorUpdate } = userUpdate;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if(successUpdate){
      dispatch({type:USER_UPDATE_RESET});
      history.push('/admin/userlist')
    }else{
      if(!user.name || user._id!==userId){
        dispatch(getUserDetail(userId))
      }else{
        setName(user.name);
        setEmail(user.email);
        setisAdmin(user.isAdmin);
      }
    }
  }, [dispatch,userId, user, successUpdate,history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({_id:userId,name,email,isAdmin}))
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader/> }
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {isLoading ? (
          <Loader></Loader>
        ) : error ? (
          <Message variant>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter your mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="checkbox">
              <Form.Label className="my-3">Is Admin</Form.Label>
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setisAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button className="my-3" type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
