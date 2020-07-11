import React from "react";
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
//import { withRouter } from "react-router";
import Sidebar from "./SideNav";
import './SideNav.css'
import MyShop from "./Shop.jsx";

class Homepage extends React.Component {
    
    state={
        category: ''
    }

    displayCategory = (category) => {
        this.setState({category})
      };


    render(){
        // console.log(this.props)
        // console.log(this.state.category)
        return (
            <>
                <>
                    <Row>
                        <Col xs={2}>      
                          <Sidebar showCategory={this.displayCategory}/>
                        </Col>
                        <Col xs={10} id="page-content-wrapper">
                          <MyShop displayCategory={this.state.category}/>
                        </Col> 
                    </Row>
    
                </>
            </>
            );
        }
  };
  //const Homepage = withRouter(Home);
  export default Homepage