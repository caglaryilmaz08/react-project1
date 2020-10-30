import React, { Component } from 'react'

export class Order extends Component {
    render() {
       const {amount,name} = this.props;
        return (
            <div>
               <li  style = {{color: "orange",fontSize : "18px",fontWeight:"bold"}}className="list-group-item">
                 {name} &nbsp;&nbsp; X{amount}
               </li>
            </div>
        )
    }
}

export default Order
