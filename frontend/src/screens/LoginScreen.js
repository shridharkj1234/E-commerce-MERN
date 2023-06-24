import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom';
import { Form,Row,Button,Col } from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userAction';

const LoginScreen = ({location,history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    console.log(userLogin);
    const {isLoading,userInfo,error}=userLogin

    const redirect=location.search ? location.search.split('=')[1] : '/'
    

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history,redirect,userInfo])

    const submitHandler=(e)=>{
        e.preventDefault();
        //DISPATCH WILL BE CALL FOR LOGIN ACTION
        dispatch(login(email,password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {isLoading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="enter your mail" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button className='my-3' type='submit' variant='primary'>Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer ?  <Link to={redirect && redirect === '/' ? '/register' : redirect ? `/register?redirect=${redirect}` : '/' } className="text-gray-500"> Register</Link>

                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
