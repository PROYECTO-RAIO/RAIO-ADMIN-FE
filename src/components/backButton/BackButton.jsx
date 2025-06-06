import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import BasicButton from '../basicButton/BasicButton';

import { Link } from "react-router-dom";

function BackButton(){

    return(
        <>
        <Navbar>
        <Container>
          <Nav className="navbar">
            <BasicButton 
                className={"btn-primary-custom"}
                as={Link} 
                to="/categorias">
                volver
            </BasicButton>
          </Nav>
        </Container>
        </Navbar>
        </>
    )
}

export default BackButton;