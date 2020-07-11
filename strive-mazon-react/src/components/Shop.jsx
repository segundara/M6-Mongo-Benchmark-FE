import React from 'react'
import {
    Container,
    Row,
    Col,
    Button,
    Card
  } from 'react-bootstrap'
  import { Link } from 'react-router-dom'
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

class MyShop extends React.Component {
    state = {
        products: []
      }
    
      fetchProducts = async () => {
        const resp = await fetch("http://127.0.0.1:3004/products")
        
        if (resp.ok) {
          const products = await resp.json()
          this.setState({
            products: products.data
          });
        }
      }
    
      fetchCategory = async (category) => {
        let d_cat
        if(category === "all-category"){
            d_cat = ""
        }
        else {d_cat = category}
        const resp = await fetch("http://127.0.0.1:3004/products?category=" + d_cat)
    
        if (resp.ok) {
          const products = await resp.json()
          this.setState({
            products: products.data
          });
        }
      }
    
    
      componentDidMount() {
        this.fetchProducts()
      }
    //   changePage = (id) => {
    //     this.props.history.push("/productDetails/" + id)
    //   }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.displayCategory !== this.props.displayCategory) {
            this.fetchCategory(this.props.displayCategory)
        }
        
    }
    
      render() {
        return (
            <>
            <Container fluid className="pt-5">
                <p className="pt-3">Total products found: {this.state.products.length}</p>
            {/* </Container>
            <Container className="pt-5"> */}
              <Row className="pt-5">
                {this.state.products.length > 0 
                ?(
                    this.state.products.map(product =>
                        <Col key={product._id} xs={3}>
                        <Card style={{ width: '20rem' }} className="mb-2">
                            <Card.Img  variant="top" src={product.imageUrl} height="250px" />
                            <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <label>Brand: {product.brand}</label>
                            {/* <label>Category: {product.category}</label>
                            <Card.Text>{product.description}</Card.Text> */}
                            <p className="d-flex justify-content-between">
                                <h4> ${product.price}</h4>
                                <Button variant="secondary">add to cart<FontAwesomeIcon icon={faCartPlus}/></Button>
                            </p>
                            </Card.Body>
                        </Card>
                        </Col>
                    ))
                    :<Col className="text-center"><p>No product in stock at the moment under {this.props.displayCategory.toUpperCase()} category</p></Col>
                }
              </Row>
            </Container>
            </>
        );
      }
    }

export default MyShop
