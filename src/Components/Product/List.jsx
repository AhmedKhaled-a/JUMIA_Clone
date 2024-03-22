import React, { lazy, Component } from "react";
import { homeServices } from "../services/_home";
import { Link } from "react-router-dom";
import './Style.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faBars } from "@fortawesome/free-solid-svg-icons";
const Paging = lazy(() => import("../Paging"));
const FilterCategory = lazy(() => import("../filter/Category"));
const CardServices = lazy(() => import("../card/CardServices"));
const CardProductGrid = lazy(() =>
  import("../card/CardProductGrid")
);
const CardProductList = lazy(() =>
  import("../card/CardProductList")
);


class ProductListView extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    main: "",
    sub: "",
    type: "",
    products: [],
    currentProducts: [],
    currentPage: null,
    totalPages: null,
    totalItems: 0,
    view: "grid",
  };

  UNSAFE_componentWillMount() {
    const totalItems = this.getProducts().length;
    this.setState({ totalItems });
  }

  onPageChanged = (page) => {
    let products = this.getProducts();
    const { currentPage, totalPages, pageLimit } = page;
    const offset = (currentPage - 1) * pageLimit;
    const currentProducts = products.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentProducts, totalPages });
  };

  onChangeView = (view) => {
    this.setState({ view });
  };

  getProducts = () => {
    let products = this.state.products;
    products = products.concat(products);
    products = products.concat(products);
    products = products.concat(products);
    products = products.concat(products);
    products = products.concat(products);
    return products;
  };

  componentDidMount() {
    let _params = this.props.match.params;

    if (_params.type) {
      homeServices.getProductsByType(_params.type).then(
        (data) => {
          this.setState({
            products: data.data,
            currentProducts: data.data,
          });
        },
        (err) => {
          console.log(err);
        }
      );
    } else if (_params.subCatName) {
      homeServices.getProductsBySubCat(_params.subCatName).then(
        (data) => {
          this.setState({
            products: data.data,
            currentProducts: data.data,
          });
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      homeServices.getProductsByMainCat(_params.main).then(
        (data) => {
          this.setState({
            products: data.data,
            currentProducts: data.data,
          });
        },
        (err) => {
          console.log(err);
        }
      );
    }

    if (_params.main) {
      this.setState({ main: this.props.match.params.main });
    }
    if (_params.subCatName) {
      this.setState({ sub: this.props.match.params.subCatName });
    }
    if (_params.type) {
      this.setState({ type: this.props.match.params.type });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="p-5 bg-warning bs-cover">
          <div className="container text-center">
            <span className="display-6 px-3 bg-white rounded shadow">
              {this.state.main} {this.state.sub} {this.state.type}
            </span>
          </div>
        </div>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb rounded-0">
            <li className="breadcrumb-item">
              <Link to="/" title="Home">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {this.state.main}
            </li>
          </ol>
        </nav>

        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-md-3">
              <FilterCategory />
              <CardServices />
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-8">
                  <span className="align-middle font-weight-bold">
                    {this.state.products.length} results for{" "}
                    <span className="text-warning">
                      "{this.state.main} {this.state.sub} {this.state.type}"
                    </span>
                  </span>
                </div>
                <div className="col-md-4">
                  <div className="btn-group ml-3" role="group">
                    <button
                      aria-label="Grid"
                      type="button"
                      onClick={() => this.onChangeView("grid")}
                      className={`btn ${
                        this.state.view === "grid"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                    >
                      <FontAwesomeIcon icon={faTh} />
                    </button>
                    <button
                      aria-label="List"
                      type="button"
                      onClick={() => this.onChangeView("list")}
                      className={`btn ${
                        this.state.view === "list"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                    >
                      <FontAwesomeIcon icon={faBars} />
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row g-3">
                {this.state.view === "grid" &&
                  this.state.currentProducts.map((product, idx) => {
                    return (
                      <div key={idx} className="col-md-4">
                        <CardProductGrid data={product} />
                      </div>
                    );
                  })}
                {this.state.view === "list" &&
                  this.state.currentProducts.map((product, idx) => {
                    return (
                      <div key={idx} className="col-md-12">
                        <CardProductList
                          data={product}
                          addToCart={this.props.onAddToCart}
                        />
                      </div>
                    );
                  })}
              </div>
              <hr />
              <Paging
                totalRecords={this.state.totalItems}
                pageLimit={9}
                pageNeighbours={3}
                onPageChanged={this.onPageChanged}
                sizing=""
                alignment="justify-content-center"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductListView;
