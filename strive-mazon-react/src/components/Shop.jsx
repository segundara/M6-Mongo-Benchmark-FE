import React from 'react'
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    ToggleButtonGroup,
    ToggleButton
  } from 'react-bootstrap'
  import { Link } from 'react-router-dom'
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

class MyShop extends React.Component {
    state = {
        products: [],
        numOfProduct: null,
        numPerPage: 3,
        currentPageNum: 1,
        sortingKeys: [],
        // selectedKey: '...'
      }

      
//   getNumberOfProduct = async () => {
//     const numOfProduct = `http://localhost:3004/products`   
//     await fetch(numOfProduct)
//     .then((response) => response.json())
    
//     .then((responseObject) =>{
//         this.setState({numOfProduct: responseObject.numberOfItems})
        
//         let keys = Object.keys(responseObject.data[0]);
        
//         keys.shift()
//         keys.shift()
//         keys.pop()
//         keys.pop()
//         keys.pop()
//         const keyArr = []

//         for (let i = 0; i < keys.length; i++) {
//             let key = keys[i];
//             keyArr.push(key)
//         }        
//         this.setState({sortingKeys: keyArr})
//     })
     
//   }

  
//   changePage = (value) => {
//     if(value > 1){
//         this.setState({
//             currentPageNum: value
//           })
//     }else {
//         this.setState({currentPageNum: 1})
//     }

//     this.fetchProducts()
// }

    
      fetchProducts = async () => {
        // const sortParam = this.state.selectedKey
    
        //const skip = (this.state.currentPageNum * this.state.numPerPage)-this.state.numPerPage
        //const url = `http://localhost:3004/products?limit=${this.state.numPerPage}&offset=${skip}&sort=`

        const resp = await fetch("http://127.0.0.1:3004/products")
        //const resp = await fetch(url)
        
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
          //this.getNumberOfProduct()
        this.fetchProducts()
      }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.displayCategory !== this.props.displayCategory) {
            this.fetchCategory(this.props.displayCategory)
        }
        
    }
    
      render() {
          console.log(this.state.sortingKeys)    
          const pageNumbers = [];
          for (let i = 1; i <= Math.ceil(this.state.numOfProduct / this.state.numPerPage); i++) {
              pageNumbers.push(i);
          }
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
              {/* <ToggleButtonGroup type="radio" name="options" defaultValue={1} className="py-3">
                {pageNumbers.map((number) => {
                    return(
                    <ToggleButton variant="secondary" key={number} value={number} onClick={()=>this.changePage(number)}>Page {number}</ToggleButton>
                    )
                })}
            </ToggleButtonGroup> */}

            </Container>
            </>
        );
      }
    }

export default MyShop
