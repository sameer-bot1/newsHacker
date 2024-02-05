import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Containers = styled.div`
    height: 60px;
    
 `;
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items:center;
    justify-content:space-between;
    
 `;
const Left = styled.div`
 flex: 1;
 display: flex;
 align-items:center;

 `;
const Language = styled.span`
font-size: 14px;
cursor: pointer;

`;
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display:flex;
    align-items:center;
    margin-left: 25px;
    padding: 5px;
`;
const Input = styled.input`
  border: none;

 
`;

const Center = styled.div`
 /* flex: 1; */
 display: flex;
 text-align:center;

 `;
const Logo = styled.h1`
 font-weight:bold;

 `;
const Right = styled.div`
 flex: 1;
 display:flex;
 justify-content: flex-end;

 `;

const MenuItem = styled.div`
  font-size: 14;
  cursor:pointer;
  margin-left:25px;
  
 `;

const Navbar1 = () => {
  const user = useSelector((state) => state.user.currentUser);
  
  const LogOut = (e) => {
    window.localStorage.clear();
    window.location.href = "/";
  }

  return (
    <Containers>
      <Wrapper>
        <Left>
          <Language>
            En
          </Language>
          <SearchContainer>
            <Input placeholder='search' />
          </SearchContainer>

        </Left>
        <Center>
          <Logo>SAM.</Logo>
        </Center>
        <Right>
          <Link to = "/" style={{ textDecoration: 'none',color:'black' }}>
          <MenuItem>Home</MenuItem>
          </Link>

          {user ? null : <Link to = "/login" style={{ textDecoration: 'none',color:'black' }}>
          <MenuItem>Login</MenuItem>
          </Link>}

          {user ? <Link to ="/" style={{ textDecoration: 'none',color:'black' }}>
          <MenuItem onClick={LogOut}>Log Out</MenuItem>
          </Link> : <Link to ="/Register" style={{ textDecoration: 'none',color:'black' }}>
          <MenuItem>Sign Up</MenuItem>
          </Link>}


        </Right>
      </Wrapper>
    </Containers>
  )
}

export default Navbar1