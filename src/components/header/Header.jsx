import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import BasicButton from '../basicButton/BasicButton';
import { Link, useLocation } from "react-router-dom";

import './Header.css';


function Header(){
const location = useLocation();
const currentPath = location.pathname;
    return(
        <>
        <Navbar>
        <Container>
          <Nav className="navbar">
            <BasicButton 
                className={`btn-primary-custom ${currentPath === '/editar' ? 'btn-accent-custom' : ''}`}
                as={Link} 
                to="/editar">
                editar
            </BasicButton>
            <BasicButton 
                className={`btn-primary-custom ${currentPath === '/ver' ? 'btn-accent-custom' : ''}`}
                as={Link} 
                to="/ver">
                ver
            </BasicButton>
            <BasicButton 
                className={`btn-primary-custom ${currentPath === '/categorias' ? 'btn-accent-custom' : ''}`}
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

export default Header;