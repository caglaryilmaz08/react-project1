import React, { Component } from 'react'

import Consumer from '../util/context'
class Admin extends Component {


    products = (data) => {

        console.log(data)
        return (
            data.map((item) => {
                return <li key={item.id} className="list-group-item">Product ID : &nbsp;&nbsp;{item.productId} &nbsp;&nbsp; Amount : &nbsp;&nbsp;{item.amount} </li>

            })
        )
    }

    render() {
        return (

            <Consumer>
                {
                    value => {
                        const { myWebsiteOrders } = value;
                        return (
                            <div className="container">
                                <ul className="list-group">
                                    {
                                        myWebsiteOrders.map((item) => {

                                            return (
                                                < div key={item.id}>
                                                    <div key={Math.random()} className="card">
                                                        <h5 className="card-header">Total Price : &nbsp; {item.totalPrice}</h5>
                                                        <h5 className="card-header">Created Time: &nbsp; {item.created}</h5>
                                                        <h5 className="card-header">Created Time: &nbsp; {item.created}</h5>
                                                        <h5 className="card-header">Created By:&nbsp; {item.createdBy}</h5>
                                                        <div className="card-body">
                                                            <h5 className="card-title">Payment Method : &nbsp; {item.paymentMethod} </h5>
                                                            {
                                                                this.products(item.orderRows)
                                                            }
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>

                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    }
                }
            </Consumer>

        )
    }
}

export default Admin

