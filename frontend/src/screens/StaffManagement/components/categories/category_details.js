// import React, { Component } from 'react';
// import axios from 'axios';
// import { useParams, useLocation } from "react-router-dom";
// function withParams(Component) {
//     return props => <Component params={
//         useParams()
//     } />
// }

// class category_details extends Component {

//     constructor(props) {
//         super(props);

//         this.status = "";

//         this.state = {
//             id: props.params.id,
//             products: [],
//             name: '',
//             category: '',
//             image: '',
//         };

//     }

//     componentDidMount() {
//         this.retrievePosts();

//     }

//     retrievePosts() {
//         axios.get("/categoryDetails/posts/c").then(res => {
//             if (res.data.success) {
//                 this.setState({ products: res.data.existingPosts });
//                 console.log(this.state.products)
//             }
//         });
//     }

//     handleChange = (e) => {
//         const { name, value } = e.target;
    
//         this.setState({
//           ...this.state,
//           [name]: value
//         });
//       }

//     // onSubmit = (e) => {
//     //     e.preventDefault();

//     //     const { name, category, image } = this.state;

//     //     // const data = {
//     //     //     name: name,
//     //     //     category: category,
//     //     //     image: image
//     //     // }
//     //     // console.log(data);

        
//     //     let data =  this.state.products;  
//     //     data = {
//     //       name: name.length != 0 ? name : data.name,
          
//     //     }
        
    
//     //     console.log(data)



//     //     axios.post("/spirits/post/c", data).then((res) => {
//     //         if (res.data.success) {
//     //             console.log(res.data.success._id);
//     //             var id = res.data.success._id
//     //             //    window.location.href=`/contactdisplay/${id}`;

//     //             this.setState(
//     //                 {
//     //                     name: "",
//     //                     category: "",
//     //                     image: ""
//     //                 }
//     //             )
//     //         }
//     //     })

//     // }


//     onSubmit = (e) => {
//         e.preventDefault();
//         const id = this.state.id
    
//         const { name, category, image } = this.state;
    
       
//         let data =  this.state.products;  
//         data = {
//           name: name.length != 0 ? name : data.name,
//           category: category.length != 0 ? category : data.category,
//           image: image.length != 0 ? image : data.image,


          
//         }
//         console.log(data)
    
//         axios.post("/spirits/post/c", data).then((res) => {
//                     if (res.data.success) {
//                         console.log(res.data.success._id);
//                         var id = res.data.success._id
//                         //    window.location.href=`/contactdisplay/${id}`;
        
//                         this.setState(
//                             {
//                                 name: "",
//                                 category: "",
//                                 image: ""
//                             }
//                         )
//                     }
//                 })
        
//             }



//     render() {
//         return (
//             <div>
//                 <p>bb</p>

//                 <div className="row">


//                     {
//                         this.state.products.map((products, index) => (
//                             <div className="col-md-4">
//                                 <div style={{ margin: "60px" }} className="shadow p-3 mb-5 bg-white rounded">
//                                     <a href={`/categoryDetails/${products._id}`} >
//                                         {products.name}
//                                     </a>

                                    

//                                     <img src={products.image} className="img-fluid" style={{ height: "200px", width: "200px" }} />
//                                     {/* <p>Rs.{item.price}</p> */}
//                                     <p>{products.name}</p>
//                                     <p>Rs.{products.price}</p>

//                                     <div className="flex-container">
//                                         <div className="m-1 w-100">

//                                             <button className="btn" onClick={this.onSubmit} >
//                                                 ADD TO CART
//                                             </button>
//                                         </div>
//                                     </div>



//                                 </div>

//                             </div>

//                         ))
//                     }

//                 </div>
//             </div>
//         )
//     }
// }

// export default withParams(category_details);
