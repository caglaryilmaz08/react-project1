import React, { Component } from 'react'


import Consumer from '../util/context'
import Order from './Order'
 class Orders extends Component {
    render() {
        return (
            <Consumer>
                {
                    value =>{
                        const {orderRows} = value;
                       
                        return(
                             < >
                          
                                <ul  style = {{backgroundColor :"black"}}className="list-group">
                                    {
                                        orderRows.map(order_data => {
                                            // console.log(order_data.product)
                                          return <Order key = {Math.random()} amount = {order_data.amount} name = {order_data.product}/>
                                        })
                                
                                    }
                                </ul>
                             </>
                            
                         

                        )
                    }
                }
            </Consumer>
        
        )
    }
}

export default Orders
  