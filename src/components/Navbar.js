import React, { Component } from 'react'

import Consumer from '../util/context'

  class Navbar extends Component {


    state  = {
        curCategory : "All"
    }
    changeCategoryName  = (name) =>{
        
        this.setState({
            curCategory : name
        })
    }

 
    filterProducts = (dispatch,id,curCategory) =>{

        dispatch({type : "FILTER_PRODUCTS",payload : id})
       dispatch({type: "CALC_PRODUCT_COUNT"})
       dispatch({type: "CHANGE_PAGE",payload : "Product_Renderer"})

        this.changeCategoryName(curCategory)

    }

    getCategories = (categories,dispatch) =>{
      
        return(
            <div className="dropdown-menu " aria-labelledby="navbarDropdown">
                {
                     categories.map((category) =>{
                        //console.log(category);
                          return(
                              <div key = {category.id}>
                                  <a  onClick = {this.filterProducts.bind(this,dispatch,category.id,category.name) } id = {category.id} className="btn btn-info btn-block" href="/#" >{category.name}</a>
                                  <div className="dropdown-divider"></div>
                              </div>
                          )
                      }) 
                }
            </div>
        )
       
      
    }

    changePage = (dispatch,page) =>{

    dispatch({type: "CHANGE_PAGE",payload :page})

    }

    render() {
        return(
            <Consumer>
                {
                    value =>{
                        const {categories,dispatch,totalProduct,successMsg} = value
                        const {curCategory} = this.state
                
                        return (  
                        <div>
                            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="navbar-brand mr-5 mb-5" >Shopping Site</div>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
            
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li className="nav-item active">
                                        <a  onClick = {this.filterProducts.bind(this,dispatch,-1,"All")} type = "button"className="btn btn-primary" href="/#">All Products <span className="sr-only">(current)</span></a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle ml-3" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Categories
                                        </a>
                                         {
                                             this.getCategories(categories,dispatch)
                                         }
                                    </li>
                                        <li  style = {{fontWeight : "bold" , fontSize : "16px"}}className="list-group-item  ml-4">Current Category :  {curCategory}   <br/>  Total Product : {totalProduct} </li>
                                       
                               
                                </ul>
                                <form className="form-inline my-2 my-lg-0">
                                <button onClick = {this.changePage.bind(this,dispatch,"Admin")} type="button" className="btn btn-warning ml-5">Admin Panel</button>
                                </form>
                                <button onClick = {this.changePage.bind(this,dispatch,"Cart")} type="button" className="btn btn-success ml-5">Show Your Cart</button>
                            </div>
                            </nav>
                            {
                                 successMsg ? 
                                 <div className="alert alert-success" role="alert">
                                 You have successfully added the product to the cart!
                                 </div>
                                 : null
                                 
                            }
                        </div>
                            
                        )
                    }
                }
            </Consumer>
        )
      
    }
}

export default Navbar;
