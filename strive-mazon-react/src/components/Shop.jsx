import React from 'react'
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    ToggleButtonGroup,
    ToggleButton,
    Alert
  } from 'react-bootstrap'
  import { Link } from 'react-router-dom'
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
  import { withRouter } from "react-router";

class MyShop extends React.Component {
    state = {
        products: [],
        numOfProduct: null,
        numPerPage: 4,
        currentPageNum: 1,
        sortingKeys: [],
        selectedKey: '...',
        updateCartInNavbar: 0
      }

      
  getNumberOfProduct = async () => {
    let category;
    if ((this.props.displayCategory === "") || (this.props.displayCategory === "all-category")){
        category = ""
    }else category = this.props.displayCategory

    const numOfProduct = `http://localhost:3004/products?category=${category}`   
    await fetch(numOfProduct)
    .then((response) => response.json())
    
    .then((responseObject) =>{
        this.setState({numOfProduct: responseObject.numberOfItems})
        
        // if(responseObject.length > 0){
        //     let keys = Object.keys(responseObject.data[0]);
            
        //     keys.shift()
        //     keys.shift()
        //     keys.pop()
        //     keys.pop()
        //     keys.pop()
        //     const keyArr = []

        //     for (let i = 0; i < keys.length; i++) {
        //         let key = keys[i];
        //         keyArr.push(key)
        //     }        
        //     this.setState({sortingKeys: keyArr})
        // }
    })
     
  }

  
  changePage = (value) => {
    if(value > 1){
        this.setState({
            currentPageNum: value
          })
    }else {
        this.setState({currentPageNum: 1})
    }
    this.fetchProducts()    
}

    
      fetchProducts = async () => {
        let d_cat
        if(this.props.displayCategory === "all-category"){
            d_cat = ""
        }
        else {d_cat = this.props.displayCategory}

        this.getNumberOfProduct()
        
        const sortParam = this.state.selectedKey
    
        const skip = (this.state.currentPageNum * this.state.numPerPage)-this.state.numPerPage
        const url = `http://localhost:3004/products?category=${d_cat}&limit=${this.state.numPerPage}&offset=${skip}&sort=${sortParam}`

        const resp = await fetch(url)
        
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

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.displayCategory !== this.props.displayCategory) {
            this.fetchProducts()
        }   
    }

    
    linkToDetails = (id) => {
        this.props.history.push("/productDetails/" + id)
    }

    addToCart = async (productId) => {
        const url = `http://localhost:3004/customers?name=Bee`
        const user = await fetch(url)
        if(user.ok){
            const userJSON = await user.json()
            console.log(userJSON.data[0]._id)
            const url = `http://localhost:3004/customers/${userJSON.data[0]._id}/add-to-cart/${productId}`
            const addProduct = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(addProduct.ok){
                console.log('added')
            }
        }
    }

    
      render() {
          const pageNumbers = [];
          for (let i = 1; i <= Math.ceil(this.state.numOfProduct / this.state.numPerPage); i++) {
              pageNumbers.push(i);
          }
        return (
            <>
            {this.props.checkout && (this.props.history.push("/checkout"))}
            <Container fluid className="pt-5">
                <p>Section: {this.props.displayCategory === "" ? "ALL-CATEGORY" : this.props.displayCategory.toUpperCase()}</p>
                <p className="pt-3">Total products found: {this.state.numOfProduct}</p>
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
                            <div className="d-flex justify-content-between">
                                <label>Brand: {product.brand}</label>
                                <h4> ${product.price}</h4>
                            </div>
                            <div className="d-flex justify-content-between">
                                <Button variant="info" onClick={() => this.linkToDetails(product._id)}>detail</Button>
                                <Button 
                                    variant="secondary" 
                                    onClick={() => (
                                        this.addToCart(product._id),
                                        this.setState({updateCartInNavbar: this.state.updateCartInNavbar + 1}),
                                        this.props.updateCart(this.state.updateCartInNavbar + 1)
                                        )}>
                                        add to cart
                                    <FontAwesomeIcon icon={faCartPlus}/>
                                </Button>
                            </div>
                            </Card.Body>
                        </Card>
                        </Col>
                    ))
                    :<Col className="text-center"><Alert variant="info">No product in stock at the moment under {this.props.displayCategory.toUpperCase()} category</Alert></Col>
                }
              </Row>
              <ToggleButtonGroup type="radio" name="options" defaultValue={1} className="py-3">
                {pageNumbers.map((number) => {
                    return(
                    <ToggleButton variant="secondary" key={number} value={number} onClick={()=>this.changePage(number)}>Page {number}</ToggleButton>
                    )
                })}
            </ToggleButtonGroup>

            </Container>
            </>
        );
      }
    }

export default withRouter(MyShop)
