import React, { Component } from 'react'

import Product from './Product' 

import Consumer from '../util/context'
 class ProductsRenderer extends Component {
    render() {
        return (
            <Consumer>
            {
    
              value =>{
                
                const {filteredProducts : products} = value;  // page handler  and data
                 
                return (
                    <div  className = "d-flex align-content-start flex-wrap">
                   
                    {
                            products.map(product =>{
                               // console.log(product)
                                return(
                                 
                                    <div key = {product.id} className="p-2">
                                    <Product data  = {product} />
                                    </div>
                                 

                                 
                                
                                )
                            
                            })
                    }
                    
                </div>            
                )
              } 
    
            }
          </Consumer>
        )
    }
}
export default ProductsRenderer;
 