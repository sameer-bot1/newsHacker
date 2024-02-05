import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { Link } from 'react-router-dom';


const Container = styled.div`
width:100vw;
height:100vh;
background:linear-gradient(rgba(255,255,255,0.5),
                          rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1") center;
background-size:cover;
display:flex;
align-items:center;
justify-content:center;
`;
const Wrapper = styled.div`
width:25%;
padding:20px;
background-color:white;
`;
const Title = styled.h1`
font-size:24px;
font-weight:300;
`;
const Form = styled.form`
display:flex;
flex-direction:column;
`;
const Input = styled.input`
flex:1;
min-width:40%;
margin:10px 0px;
padding:10px;
`;

const Agreement = styled.span`
font-size:12px;
margin:20px 0px;
`;

const Button = styled.button`
width:40%;
border:none;
padding:15px 20px;
background-color:teal;
color:white;
cursor:pointer;
&:disabled{
  color: green;
  cursor: not-allowed;
}
`;

const Link1 = styled.a`
margin:5px 0px;
font-size:12px;
text-decoration:underline;
cursor: pointer;
`;
const Error = styled.span`
  color: red;
`

const Login = () => {
  const [username,setUsername] = useState("");
  const [password,setPassword ]= useState("");
  const dispatch  = useDispatch();
  const  {isFtching, error} = useSelector((state) => state.user);

  const handleClick = (e)=> {
    e.preventDefault();
    login(dispatch,{username,password});
  }
  return ( 
    <Container>
            <Wrapper>
                <Title>SIGN IN </Title>
                <Form>
                    <Input
                     placeholder="username"
                     onChange={(e)=>setUsername(e.target.value)}
                     />
                    <Input 
                    placeholder="password" 
                    // type="password"
                     onChange={(e)=>setPassword(e.target.value)} 
                     />
                    <Button onClick={handleClick} disabled = {isFtching} >SIGN IN</Button>
                    {error && <Error>Something not right</Error>}
                    <Link1>DO NOT YOU REMEMBER THE PASSWORD </Link1>
                   <Link1> <Link to ="/register">CREATE AN ACCOUNT </Link></Link1>
                    <Agreement>Guest username: <b>admin</b>  PASSWORD:<b> 12655<b></b></b></Agreement>

 
                </Form>

            </Wrapper>
        </Container>
  )
}

export default Login