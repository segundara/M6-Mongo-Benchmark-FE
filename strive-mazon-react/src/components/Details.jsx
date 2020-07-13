import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Image,
    Navbar,
    Nav,
    Button,
    Modal,
    Form,
    Accordion,
    Card,
    Badge
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Details extends Component {

    state = {
        product: [],
        addReview: false,
        editModal: false,
        newReview: {
            comment: "",
            rate: 1
        },
        editProductInfo: {
            name: "",
            brand: "",
            description: "",
            imageUrl: '',
            price: null,
            category: ''
        },
        reviews: [],
        photo: ''
    }


    editInfo = (event) => {
        const editProductInfo = this.state.editProductInfo

        if (event.currentTarget.id === "price") {
            editProductInfo[event.currentTarget.id] = parseInt(event.currentTarget.value)
        } else {
            editProductInfo[event.currentTarget.id] = event.currentTarget.value
        }
        this.setState({ editProductInfo })
    }

    handleChange = (e) => {
        const newReview = this.state.newReview
        if (e.currentTarget.id === "rate") {
            newReview[e.currentTarget.id] = parseInt(e.currentTarget.value)
        } else {
            newReview[e.currentTarget.id] = e.currentTarget.value
        }

        this.setState({
            newReview
        });
    }

    fetchDetails = async () => {
        const resp = await fetch("http://127.0.0.1:3004/products/" + this.props.match.params.id + "/reviews")
        if (resp.ok) {
            const details = await resp.json()
            this.setState({
                reviews: details.productReviews.reviews,
                product: details.productReviews
            });
        }
    }

    addReview = async (e) => {
        e.preventDefault()
        const resp = await fetch("http://127.0.0.1:3004/reviews", {
            method: "POST",
            body: JSON.stringify(this.state.newReview),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (resp.ok) {
            const res = await fetch("http://127.0.0.1:3004/reviews")
            if (res.ok) {
                const reviews = await res.json()
                const newRev = reviews.pop()
                console.log(newRev)
                console.log(newRev._id)
                
                const proRev = await fetch("http://127.0.0.1:3004/products/" + this.props.match.params.id)
                if (proRev.ok) {
                    const product = await proRev.json()
                    const revArr = product.product.reviews
                    revArr.push(newRev)
                    console.log(revArr)
                    const allReviews = revArr.map(review => review._id)
                    console.log(allReviews)

                    const updateReviews = await fetch("http://127.0.0.1:3004/products/" + this.props.match.params.id, {
                        method: "PUT",
                        body: JSON.stringify({reviews: allReviews}),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    if(updateReviews.ok){
                        this.setState({
                            addReview: false,
                            newReview: {
                                comment: "",
                                rate: null
                            },
                        });
                        
                        this.fetchDetails()
                    }else console.log('noooooo');
                    
                }
            }
        }
    }

    editProduct = async () => {
        const resp = await fetch("http://127.0.0.1:3004/products/" + this.props.match.params.id)

        if (resp.ok) {
            const product = await resp.json()
            this.setState({
                editProductInfo: {
                    name: product.product.name,
                    brand: product.product.brand,
                    description: product.product.description,
                    imageUrl: product.product.imageUrl,
                    price: parseInt(product.product.price),
                    category: product.product.category
                },
                editModal: true
            });
        }
    }

    deleteProduct = async () => {
        const resp = await fetch("http://127.0.0.1:3004/products/" + this.props.match.params.id, {
            method: "DELETE"
        })
        if (resp.ok) {
            this.props.history.push("/")
        }
    }

    componentDidMount() {
        this.fetchDetails()
    }

    saveImg = (e) => {
        this.setState({
            photo: e.target.files[0]
        });
    }

    deleteReview = async (id) => {
        const resp = await fetch("http://127.0.0.1:3004/reviews/" + id, {
            method: "DELETE"
        })

        this.fetchDetails()

    }

    updateProduct = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("product", this.state.photo)

        const resp = await fetch("http://127.0.0.1:3004/products/" + this.props.match.params.id, {
            method: "PUT",
            body: JSON.stringify(this.state.editProductInfo),
            headers: {
                "Content-Type": "application/json"
            }
        })

        let addPhoto = await fetch("http://127.0.0.1:3004/products/" + this.props.match.params.id + "/upload", {
            method: "POST",
            body: data
        })

        if (resp.ok) {
            this.setState({
                editModal: false
            });
            this.fetchDetails()
        }

    }



    render() {
        // console.log(this.props)
        return (
            <div>
                <Container className="py-5">
                    <Row>
                        {this.state.product &&(
                            <>
                                <Col md={6} className="mt-5">
                                    <Image src={this.state.product.imageUrl} style={{ height: "50vh", width: "25rem" }} />
                                </Col>
                                <Col md={6} className="mt-5 text-center">
                                    <div>
                                        <h3>{this.state.product.name}</h3>
                                        <h5 className="mt-5">Description</h5>
                                        <p>{this.state.product.description}</p>
                                        <h5>Brand</h5>
                                        <p>{this.state.product.brand}</p>
                                        <h5>Price</h5>
                                        <p>${this.state.product.price}</p>
                                    </div>
                                    <div className="mb-3">
                                        <Button onClick={() => this.setState({ addReview: true })}>Add review</Button>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <Button
                                            variant="danger"
                                            className="mr-3"
                                            onClick={() => this.deleteProduct()}
                                        >Delete</Button>
                                        <Button
                                            variant="warning"
                                            onClick={() => this.editProduct()}
                                        >Edit</Button>
                                    </div>
                                    <div className="d-flex justify-content-center mt-4">
                                        {this.state.reviews.length > 0 ?
                                            <Accordion style={{ width: "70%" }}>
                                                <Card>
                                                    <Card.Header>
                                                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                            See customers' reviews!
                                                </Accordion.Toggle>
                                                    </Card.Header>
                                                    <Accordion.Collapse eventKey="1">
                                                        <>
                                                            {this.state.reviews.map(review =>
                                                                <Card.Body key={review._id}>
                                                                    <Badge variant="info">{review.rate}</Badge> : {review.comment}
                                                                    <Button
                                                                        className="ml-3"
                                                                        variant="danger"
                                                                        onClick={() => this.deleteReview(review._id)}
                                                                    >Delete</Button>
                                                                    <Button
                                                                        className="ml-3"
                                                                        variant="warning"
                                                                    >Edit</Button>
                                                                </Card.Body>
                                                            )}
                                                        </>
                                                    </Accordion.Collapse>
                                                </Card>
                                            </Accordion>
                                            :
                                            null
                                        }
                                    </div>
                                </Col>
                            </>
                        )}
                    </Row>
                    <Modal show={this.state.addReview} onHide={() => this.setState({
                        addReview: false,
                        newReview: {
                            comment: "",
                            rate: null
                        }
                    })}>
                        <Modal.Body>
                            <Form onSubmit={this.addReview} >
                                <Row className="d-flex justify-content-center">
                                    <Col md={8}>
                                        <Form.Group controlId="comment">
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control
                                                value={this.state.newReview.comment}
                                                onChange={this.handleChange}
                                                type="text"
                                                placeholder="Your comment for the product" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-center">
                                    <Col md={8}>
                                        <Form.Group controlId="rate">
                                            <Form.Label>Rate the product</Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={this.state.newReview.rate}
                                                onChange={this.handleChange}
                                                placeholder="Rate between 1-5" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="d-flex justify-content-center">
                                    <Button variant="primary" type="submit">
                                        Add review
                                </Button>

                                </div>

                            </Form>
                        </Modal.Body>
                    </Modal>
                    <Modal
                        show={this.state.editModal}
                        onHide={() => this.setState({
                            editModal: false, editProductInfo: {
                                name: "",
                                brand: "",
                                description: "",
                                imageUrl: '',
                                price: null,
                                category: ''
                            }
                        })}>
                        <Modal.Body>
                            <Form onSubmit={this.updateProduct}>
                                <div className="form-group mt-5">
                                    <label for="name">Product name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Input here the Product name"
                                        onChange={this.editInfo}
                                        value={this.state.editProductInfo.name}
                                        required
                                    />
                                </div>
                                <div className="form-group ">
                                    <label for="category">Product Category</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="category"
                                        placeholder="Input here the category name"
                                        onChange={this.editInfo}
                                        value={this.state.editProductInfo.category}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="description">Product description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        placeholder="Input here the Product description"
                                        onChange={this.editInfo}
                                        value={this.state.editProductInfo.description}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="price">Product brand</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="brand"
                                        placeholder="Input here the Product brand"
                                        onChange={this.editInfo}
                                        value={this.state.editProductInfo.brand}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="price">Product price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        placeholder="Input here the Product price"
                                        onChange={this.editInfo}
                                        value={this.state.editProductInfo.price}
                                        required
                                    />
                                </div>
                                <div>
                                    <input type="file" name="file" onChange={this.saveImg} />
                                </div>
                                <div className="form-group">
                                    <Button className="btn btn-primary mt-4" type="submit">
                                        Update Product Info
                                </Button>
                                </div>
                            </Form>

                        </Modal.Body>
                    </Modal>
                </Container>
            </div>
        );
    }
}

export default Details;