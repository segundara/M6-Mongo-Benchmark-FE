import React from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import './SideNav.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop, faGamepad, faTv, faPhone, faMugHot, faHeartbeat, faListUl} from "@fortawesome/free-solid-svg-icons";

class Sidebar extends React.Component {


    render(){
        return (
            <>
    
                <Nav className="col-md-12 d-none d-md-block bg-light sidebar shadow-lg"
                onSelect={selectedKey => this.props.showCategory(`${selectedKey}`)}>
                
                <div className="text-center">
                    Product Categories
                </div>
                <hr/>
    
                
                <Nav.Item>
                    <Nav.Link eventKey="all-category">
                        <FontAwesomeIcon icon={faListUl} className="mr-4"/>
                        All Category
                    </Nav.Link>
                </Nav.Item>
                <hr/>
    
                <Nav.Item>
                    <Nav.Link eventKey="computers">
                        <FontAwesomeIcon icon={faLaptop} className="mr-4"/>
                        Computers
                    </Nav.Link>
                </Nav.Item>
                <hr/>

                <Nav.Item>
                    <Nav.Link eventKey="gaming">
                        <FontAwesomeIcon icon={faGamepad} className="mr-4"/>
                        Gaming
                    </Nav.Link>
                </Nav.Item>
                <hr/>

                <Nav.Item>
                    <Nav.Link eventKey="tv">
                        <FontAwesomeIcon icon={faTv} className="mr-4"/>
                        TV and Video
                    </Nav.Link>
                </Nav.Item>
                <hr/>

                <Nav.Item>
                    <Nav.Link eventKey="phones">
                        <FontAwesomeIcon icon={faPhone} className="mr-4"/>
                        Phones and GPS
                    </Nav.Link>
                </Nav.Item>
                <hr/>

                <Nav.Item>
                    <Nav.Link eventKey="welfare">
                        <FontAwesomeIcon icon={faHeartbeat} className="mr-4"/>
                        Welfare and health
                    </Nav.Link>
                </Nav.Item>
                <hr/>

                <Nav.Item>
                    <Nav.Link eventKey="domestic">
                        <FontAwesomeIcon icon={faMugHot} className="mr-4"/>
                        Domestic appliances
                    </Nav.Link>
                </Nav.Item>
                </Nav>
    
            </>
            );
        }
  };
  //const Sidebar = withRouter(Side);
  export default withRouter(Sidebar)