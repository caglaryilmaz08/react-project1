import React, { Component } from 'react'


import {Orders} from '../components'
import Consumer from '../util/context'
 class Cart extends Component {
     
    state = {
     
       successPage :  false,
    }
    returnHomePage = (dispatch) =>{

        this.setState({
            successPage : false,
        })

        dispatch({type:"CHANGE_PAGE",payload:"Product_Renderer"})
    }

    checkOut = (dispatch,totalPrice) =>{
      
        if(totalPrice !== 0)
        {
            this.setState({
                successPage : true,
            })
            dispatch({type : "CREATE_ORDER"})
        }
        else{
            alert("please do not forget to add products")
        }
      

    }
    render() {
        return (
           < Consumer>
           {
               value =>{
                   const{totalPrice,dispatch} = value;
                   const {successPage}  = this.state;
                   return (
                    <div className = "container">
                        {
                            !successPage 
                            ? 
                                <div className="card">
                                <div className="card-header">
                                <h3>Total Price : &nbsp; {totalPrice} </h3> 
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Order summary</h5>
                                        <Orders/>
                                    <button onClick = {this.checkOut.bind(this,dispatch,totalPrice)} type="button" className="btn btn-primary">Check Out</button>
                                </div>
                                </div>

                            
                            :
                            <div className="card">
                                 <div className="card-header">
                                    <div className="alert alert-success" role="alert">
                                        Your order has been successfully received.
                                    </div>
                                </div>
                           
                             <button onClick = {this.returnHomePage.bind(this,dispatch)} type="button" className="btn btn-primary">Return Home Page</button>
                             </div>
                        }
                      
                    </div>
                   )

               }
           }
           </Consumer>
            
        

        )
    }
}

export default Cart;

