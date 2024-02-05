import { useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";

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
width:40%;
padding:20px;
background-color:white;
`;
const Title = styled.h1`
font-size:24px;
font-weight:300;
`;
const Form = styled.form`
display:flex;
flex-wrap:wrap;
`;
const Input = styled.input`
flex:1;
min-width:40%;
margin:20px 10px 0px 0px;
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
`;



const Register = () => {

    const [username,setUsername] = useState("");
    const [password,setPassword ]= useState("");
    const [email,setEmail ]= useState("");
    const [error,setError] = useState(false);
    
    
    const handleClick = async (e)=> {
        e.preventDefault();
        setError(false);
        try {
            const res = await publicRequest.post("/auth/register",{
                username,
                email,
                password,
               });
            res.data && window.location.replace("/");
        } catch (err) {
          setError(true);
        }
      
      };

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input
                     placeholder="username"
                     onChange={(e)=>setUsername(e.target.value)}
                     />
                    <Input
                     placeholder="email"
                     onChange={(e)=>setEmail(e.target.value)}
                     />
                    <Input
                     placeholder="password"
                     onChange={(e)=>setPassword(e.target.value)}
                     />
                    <Agreement>By creating an account , i consent to the processing of my personal data in accordance with the <b> PRIVACY POLICY<b></b></b></Agreement>
                    <Button onClick={handleClick}>CREATE</Button>
                </Form>
                    {error &&  <span style={{color:"red"}}>Username and password already taken...</span>}

            </Wrapper>
        </Container>
    )
}

export default Register