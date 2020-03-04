import React, { Component } from "react";
import Navbar from "../layout/navbar";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { getProductsCashier } from "../redux/action/product";
import { Link } from "react-router-dom";

import ProductAdd from "./productAdd";
import ProductDelete from "./productDelete";
import ProductUpdate from "./productUpdate";

class Product extends Component {
  state = {
    show: false,
    showDelete: false,
    showUpdate: false,

    selectProductUpdate: null,
    selectProductDelete: null,

    activePage: 1,
    sort: "id",
    by: "ASC",
    serachName: "",
    activeCategory: ""
  };

  getProductsCashier = () => {
    const data = {};
    this.props.dispatch(getProductsCashier(data));
  };
  

  onClickMenu = e => {
    this.setState({ activeCategory: e.target.id });
    if (e.target.id === "") this.setState({ activeCategory: "" });
    const data = {
      activePage: 1,
      activeCategory: e.target.id,
      serachName: "",
      sort: this.state.sort,
      by: this.state.by
    };
    this.props.dispatch(getProductsCashier(data));
  };

  onSort = e => {
    this.setState({ sort: e.target.id });
    const data = {
      activePage: 1,
      activeCategory: this.state.activeCategory,
      serachName: "",
      sort: e.target.id,
      by: this.state.by
    };
    this.props.dispatch(getProductsCashier(data));
  };

  onBy = e => {
    this.setState({ by: e.target.id });
    const data = {
      activePage: 1,
      activeCategory: this.state.activeCategory,
      serachName: "",
      sortBy: this.state.sort,
      sort: e.target.id
    };
    this.props.dispatch(getProductsCashier(data));
  };

  onChangeSearch = e => {
    this.setState({ serachName: e.target.value });
    const data = {
      activePage: 1,
      activeCategory: "",
      serachName: e.target.value,
      sort: this.state.sort,
      by: this.state.by
    };
    this.props.dispatch(getProductsCashier(data));
  };

  changePage = e => {
    this.setState({ activePage: e });
    const data = {
      activePage: e,
      activeCategory: this.state.activeCategory,
      serachName: this.state.serachName,
      sort: this.state.sort,
      by: this.state.by
    };
    this.props.dispatch(getProductsCashier(data));
  };

  // getProducts = () => {
  //   this.props.dispatch(getProducts());
  // };

  // Delete
  onSelectProductDelete = product => {
    this.setState({
      selectProductDelete: product,
      showDelete: true
    });
  };

  handleCloseDelete = () => {
    this.setState({
      showDelete: false
    });
  };

  handleShowDelete = product => {
    console.log(product);
    this.setState({
      showDelete: true,
      selectProductDelete: product
    });
  };

  // Update
  onSelectProductUpdate = product => {
    this.setState({
      selectProductUpdate: product,
      showUpdate: true
    });
  };

  handleCloseUpdate = () => {
    this.setState({
      showUpdate: false
    });
  };

  handleShowUpdate = product => {
    console.log(product);
    this.setState({
      showUpdate: true,
      selectProductUpdate: product
    });
  };

  componentDidMount() {
    this.getProductsCashier();
  }

  onShow = e => {
    this.setState({
      show: true
    });
  };

  onHandleClose = () => {
    this.setState({
      show: false
    });
  };

  render() {
    const { products } = this.props;
    return (
      <Container>
        <Navbar />
        <nav class="navbar navbar-light bg-light">
          <ul class="navbar nav bg-light">
            <li class="nav-item">
              <Link class="nav-link" id="" onClick={this.onClickMenu}>
                All
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" id="food" onClick={this.onClickMenu}>
                Foods
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" id="drink" onClick={this.onClickMenu}>
                Drinks
              </Link>
            </li>
            <li class="nav-item dropdown">
              <Link
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                By
              </Link>
              <div class="dropdown-menu">
                <Link class="dropdown-item" id="name" onClick={this.onBy}>
                  Name
                </Link>
                <Link class="dropdown-item" id="price" onClick={this.onBy}>
                  Price
                </Link>
              </div>
            </li>
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                onChange={this.onChangeSearch}
              />
            </form>
          </ul>
          </nav>
        <Row style={{ marginTop: "20px", marginButtom: "20px" }}>
          <Col sm={10}>
            <h5>Product</h5>
          </Col>
          <Col sm={2}>
            <Button variant="outline-info" size="sm" onClick={this.onShow}>
              Add Product
            </Button>
          </Col>
        </Row>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nama</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category_name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <td>
                    <Button
                      variant="outline-warning"
                      onClick={() => this.handleShowUpdate(product)}
                    >
                      Edit
                    </Button>
                    {"      "}
                    <Button
                      variant="outline-danger"
                      onClick={() => this.handleShowDelete(product)}
                    >
                      Delete
                    </Button>
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

         

        <ProductAdd show={this.state.show} onHandleClose={this.onHandleClose} />
        <ProductDelete
          show={this.state.showDelete}
          onHide={this.handleCloseDelete}
          onSelectProductDelete={this.onSelectProductDelete}
          product={this.state.selectProductDelete}
        />
        <ProductUpdate
          show={this.state.showUpdate}
          onHide={this.handleCloseUpdate}
          onSelectProductDelete={this.onSelectProductUpdate}
          product={this.state.selectProductUpdate}
        />

<nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            {this.props.pages.map(page => (
              <li
                className="page-item"
                key={page}
                id={page}
                onClick={() => this.changePage(page)}
              >
                <Link className="page-link">
                  {page}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products,
    pages: state.products.pages
  };
};

export default connect(mapStateToProps)(Product);