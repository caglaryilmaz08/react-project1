import React, { Component } from 'react'

import Consumer from './context'
import {Navbar,ProductsRenderer,Cart,Admin} from '../components'


  

   
 class Router extends Component {

 prepareThePage = (currentPage) =>{

        switch(currentPage)
        {
            case "Product_Renderer" :
                {
                    return(
                        <ProductsRenderer/>
                    )
                }
            case "Cart" :
                {
                    return(
                        <Cart/>
                    )
                }
            case "Admin" :
                {
                    return(
                        <Admin/>
                    )
                }    
            default : {
    
            }
    
        }
        
    }



    render() {
        return (
            <Consumer>
                {
                    value =>{
                        const {currentPage} = value;
                        
                        return(
                            <>
                            <Navbar/>
                            {
                                this.prepareThePage(currentPage)
                            }   
                            </>
                           
                        )
                    }
                }
            </Consumer>
        )
    }
}

export default Router;
 