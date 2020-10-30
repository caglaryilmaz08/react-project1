import React, { Component } from 'react'

import logo from '../assets/no_image.png';
import Consumer from '../util/context'
 class Product extends Component {

    state = {

        src : this.props.data.imageUrl,
        error: false,
        quantity : 1,
    }

    changeInput = (e) =>{  
      const name = e.target.name;
      const value = e.target.value;
     // console.log(value)

     this.setState({
        [name] : Number(value),
     })
  
}  
    
    onError = () => {
        if (!this.state.error) {
          this.setState({
           src : logo, 
            error: true,
          });
        }
      }

      addCart =(dispatch,id) =>{
           
        const {quantity} = this.state
        dispatch({type : "ADD_CART",payload : {id , quantity}})
        dispatch({type:"SUCCESS_MSG"});  // open

      const timer =   setInterval(() => {
          dispatch({type:"SUCCESS_MSG"});  // close
          clearInterval(timer)
        }, 1750);
      }
    render() {
        const {data} = this.props;
        const { src,quantity } = this.state;
        return (
          <Consumer>
            {
              value =>{
                const {dispatch} = value;
                  return(
                    <div className="card" style={{width: "18rem"}}>
                    <div className="card-header">
                      <h2>{data.name}     </h2>
                    </div>
                    <img className="card-img-top" src= {src} alt={data.name} onError={this.onError} />
                    <div className="card-body">
                        <p className="card-text">{data.description}</p>
                    
                    </div>
                    <div className="card-footer">
                        <h5 className="card-title"> Price : {data.price}</h5>
                        <h5 className="card-title">Release date : {data.year}</h5>

                        <label htmlFor="quantity"><h5>Quantity : &nbsp;</h5></label>
                        <input  value = {quantity}    onChange = {this.changeInput}  style = {{width : "50px"}} type="number" id="quantity" name="quantity" min="1" max="1000"/>

                        <a href="/#"  onClick = {this.addCart.bind(this,dispatch,data.id)} className="btn btn-success btn-lg btn-block">Add Cart</a>
                    </div>
                  </div>
                  )
               
              }
            }
          </Consumer>
        )
    }
}

export default Product;
 