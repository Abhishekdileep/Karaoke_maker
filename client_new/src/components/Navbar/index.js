import React from "react";
import  Navbar  from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../../k-bar-lite.svg'
import { Container , Button  } from "react-bootstrap";
import './index.css'
const _Navbar = () => {
return (
	<>
    <Navbar  className="bg-primary bg-opacity-50 sticky-top">
        <Container className="m-auto">
            <Nav.Link href="/" > 
                <img src={logo} className="logo--img" alt="logo" />
            </Nav.Link>
            <div className="d-flex row-reverse p-2 border-white dark-text">
                <Nav className="me-auto p-2 white-bg">
                    <Nav.Link href="/about">
                        Lyrics-Gen
                    </Nav.Link> 
                    <Nav.Link href="/contact">
                        Aucostics-Gen
                    </Nav.Link>
                </Nav>
            </div>
        </Container>
    </Navbar>
	</>
);
};

export default _Navbar;
 