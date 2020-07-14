import React from 'react';
import {Navbar, Nav, Badge} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

class NavBar extends React.Component {
    state={
        
    }

    render() {

        return (
            <Navbar collapseOnSelect expand="lg" variant="light" bg="light" className="shadow-lg border border-success">
                <Link to='/'>
                    <Navbar.Brand>Strive-Mazon</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/"
                            className={
                                this.props.location.pathname === '/'
                                ? "nav-link active"
                                : "nav-link"
                            }
                            >
                            Home
                        </Link>
                    </Nav>
                    {/* <Nav>
                        <Nav.Link href="#">Search</Nav.Link>
                    </Nav> */}
                    <FontAwesomeIcon icon={faCartPlus} className="mt-4" onClick={()=>this.props.history.push("/checkout")}/>
                    <Badge variant="info">{this.props.updateProductInCart ?this.props.updateProductInCart :0}</Badge>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}


export default withRouter(NavBar);
