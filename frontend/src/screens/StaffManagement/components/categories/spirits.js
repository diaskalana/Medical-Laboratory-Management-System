import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

function withParams(Component) {
  return () => {
    const params = useParams();
    return <Component params={params} />;
  };
}

class Spirits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.params.id,
      products: [],
      name: '',
      category: '',
      image: '',
      price: ''
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("/spirits/posts").then(res => {
      if (res.data.success) {
        this.setState({ products: res.data.existingPosts });
      }
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  onSubmit = (e, product) => {
    e.preventDefault();

    const { name, category, image,price } = this.state;

    let data = {
      name: name.length > 0 ? name : product.name,
      category: category.length > 0 ? category : product.category,
      image: image.length > 0 ? image : product.image,
      price: price.length > 0 ? price : product.price,
    }

    axios.post("/spirits/post/c", data).then((res) => {
      if (res.data.success) {
        window.location.href = "/cartPage";
        this.setState({
          name: "",
          category: "",
          image: ""
        });
      }
    })
  }

  render() {
    const { products } = this.state;

    return (
      <div>
        <div className="row">
          {products.map((product, index) => (
            <div className="col-md-4" key={index}>
              <div style={{ margin: "60px" }} className="shadow p-3 mb-5 bg-white rounded">
                <p><b>{product.name}</b></p>
                <img src={product.image} className="img-fluid" style={{ height: "200px", width: "200px" }} />
                <p>Rs.{product.price}</p>
                <p>{product.capacity}ml</p>
                <form onSubmit={(e) => this.onSubmit(e, product)}>
                  <div className="flex-container">
                    <div className="m-1 w-100">
                      <button className="cart-button" type="submit">ADD TO CART</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withParams(Spirits);