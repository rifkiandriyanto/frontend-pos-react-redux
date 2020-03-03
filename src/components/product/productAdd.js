import React, { Component } from "react";
import { Modal, Button, Form} from "react-bootstrap";

import { connect } from "react-redux";
import { postProduct } from "../redux/action/product";

class ProductAdd extends Component {
  state = {
    name: "",
    description: "",
    image: "",
    category: 0,
    price: 0,
    stock: 0,
  };

  onChangeValue = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFileChange = e => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("image", this.state.image);
    data.append("name", this.state.name);
    data.append("description", this.state.description);
    data.append("category", this.state.category);
    data.append("price", this.state.price);
    data.append("stock", this.state.stock);
      this.props.dispatch(postProduct(data));
      this.props.onHandleClose();
  };

  render() {
    console.log(this.props);
    return (
      <Modal show={this.props.show} onHide={this.props.onHandleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.onSubmitHandler}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={this.state.name}
                placeholder="Enter name"
                name="name"
                onChange={this.onChangeValue}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={this.state.description}
                placeholder="Enter Description"
                name="description"
                onChange={this.onChangeValue}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" name="category" 
              onChange={this.onChangeHandler}
              >
                <option selected disabled>
                  Choose...
                </option>
                <option value={1}>Food</option>
                <option value={2}>Drink</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={this.handleFileChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Text>Rp. </Form.Text>
              <Form.Control
                type="number"
                value={this.state.price}
                name="price"
                onChange={this.onChangeValue}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={this.state.stock}
                name="stock"
                onChange={this.onChangeValue}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default connect()(ProductAdd);
