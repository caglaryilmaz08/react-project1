import React ,{Component} from 'react'     

import axios from 'axios'

const reducer = (state,action) =>{ 
    
        switch(action.type)
        {
          case "FILTER_PRODUCTS":
           
          return{
             ...state,
               
             filteredProducts :  (action.payload === -1) 
             ? [...state.products] 
             :  state.products.filter((product) =>{

                return product.productCategory.some( (category) => 
                  category.categoryId === action.payload)
             })

            


          }
          case "CALC_PRODUCT_COUNT":
          return{
             ...state, 
             
              totalProduct : state.filteredProducts.length
          }

          case "CHANGE_PAGE":
          return{
             ...state, 
             currentPage : action.payload
          }
          case "ADD_CART":
            {
              const selectedProduct = state.products.filter((product) => product.id === action.payload.id)[0]
             // console.log(selectedProduct)
               
              
               const productId = selectedProduct.id;
               const product = selectedProduct.name;
               const amount = action.payload.quantity;
               const orderId = state.orderId;

              state.totalPrice += (selectedProduct.price * amount)
              state.orderRows.push({ productId,product,amount,orderId})

              //console.log(state.orderRows)
              return state
              
            }
            case "SUCCESS_MSG":
              return{
                ...state,
                successMsg : !state.successMsg
              }
            case "CREATE_ORDER" :{
             
              state.orderRows.forEach((item) =>{
                 item.product = null
              })

             const  data  = { 
                created :  new Date(),
                createdBy : "CAGLAR YILMAZ",
                paymentMethod : "Mastercard",
                totalPrice : state.totalPrice,
               
                orderRows : state.orderRows,
              }
              createOrder(data)
              state.totalPrice  = 0;
              state.orderRows = [];

              break;
            }
            
          default :
          return state
        }

}



const createOrder = async (data) => {

  console.log(data)
  axios.post("https://medieinstitutet-wie-products.azurewebsites.net/api/orders", data)
  .catch((error) => {
      console.log(error.message);
  })
  .then((response) => {
      console.log(response);
  }) 

  }


const Context = React.createContext();


export  class Provider extends Component {

  state = {
    myWebsiteOrders : [],
    totalPrice :0,
    successMsg : false,
     id : 5500,
    orderId : 4500,
    orderRows : [],
    products : [],
    categories : [],
    totalProduct : 0,
    filteredProducts : [],
    currentPage : "Product_Renderer",
    dispatch : action =>{  

      this.setState(state =>reducer(state,action))
    }

    
  }

  //axios
  componentDidMount = async () => {   
    
  
    const response1 =  await axios.get("https://medieinstitutet-wie-products.azurewebsites.net/api/products")
      
    //console.log(response.data)   
    const   response2 = await axios.get("https://medieinstitutet-wie-products.azurewebsites.net/api/categories")
    
    const   response3 = await axios.get("https://medieinstitutet-wie-products.azurewebsites.net/api/orders")
    // console.log(response2.data)

     const myWebsiteOrders = response3.data.filter((item) => item.createdBy === "CAGLAR YILMAZ")
    this.setState({
      products : response1.data,
      filteredProducts : response1.data,
      totalProduct : response1.data.length,
      categories : response2.data,
      myWebsiteOrders,
      
    })
  }

  
    render() {
        return (
            
            <Context.Provider value = {this.state}>
             {this.props.children}
            </Context.Provider>
        )
    }
}

const Consumer = Context.Consumer;

export default Consumer;
