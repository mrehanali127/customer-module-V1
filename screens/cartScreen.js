import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,ScrollView } from "react-native";
import Colors from '../constants/Colors';;
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import { useEffect, useState,useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import { manageCartItems,removeCartItem,getCartData,increaseQuantity,decreaseQuantity,removeFromCartTable } from "../store/actions/dishActions";
import CartItem from "../components/cartItem";
import AmountCard from "../components/amountCard";
import IP from "../constants/IP";

const CartScreen=(props)=>{

    
    const[cartItems,setCartItems]=useState([]);
    const[cartTable,setCartTable]=useState([]);
    const [isLoading,setLoading]=useState(true);
    const [isDataLoading,setDataLoading]=useState(true);
    const[sumSubTotal,setSumSubTotal]=useState(0);
    const dispatch=useDispatch();
    var subTotal=0;
    let listOfTokens=[];
    let listOfDishIds=[];
    const cartTableRecord=useSelector(state=>state.dish.cartTableData);
    const customerDetail=useSelector(state=>state.dish.customerDetails);
    const itemsInCart=useSelector(state=>state.dish.cartItems);

    useEffect(()=>{
      const customerId=customerDetail.phone;
      fetch(`http://${IP.ip}:3000/cart/${customerId}`)
      .then((response)=>response.json())
      .then((response)=>setCartTable(response))
      .then(()=>dispatch(getCartData(cartTable)))
      .catch((error)=>console.error(error))
      .finally(()=>setDataLoading(false));
      
    },[isDataLoading]);


    useEffect(()=>{
      // const customerId=props.navigation.getParam('customerId');
      const customerId=customerDetail.phone;
      fetch(`http://${IP.ip}:3000/cart/dishes/${customerId}`)
       .then((response)=>response.json())
       .then((response)=>setCartItems(response))
       .then(()=>dispatch(manageCartItems(cartItems)))
       .then(()=>console.log("running"))
       .then(()=>{
       })
       .catch((error)=>console.error(error))
       /*
       fetch(`http://${IP.ip}:3000/cart/${customerId}`)
      .then((response)=>response.json())
      .then((response)=>setCartTable(response))
      .then(()=>dispatch(getCartData(cartTable)))*/
      .finally(()=>setLoading(false));
     },[isLoading]);

     
    
    
    
     /*
     const getUpdatedData=()=>{
      const customerId='03082562292';
      fetch(`http://${IP.ip}:3000/cart/dishes/${customerId}`)
       .then((response)=>response.json())
       .then((response)=>setCartItems(response))  
       .catch((error)=>console.error(error));
     }*/

    const incrementHandler=(dishId)=>{
      //const customerId='03082562292';
      const customerId=customerDetail.phone;
      
      dispatch(increaseQuantity(dishId));
      const selectedDish=cartTableRecord.find(dish=>dish.dish_id===dishId);
      let url=`http://${IP.ip}:3000/cart/updateQuantity/${customerId}/${dishId}`;
      let data={
          quantity: selectedDish.quantity,
          totalAmount:selectedDish.total_amount
      }
      fetch(url,{
          method:'PUT',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          body:JSON.stringify(data)
      }).then((response)=>response.json())
      .catch((error)=>console.error(error))   
      console.log("/////////// selecte Dish /////////////////")
      console.log(selectedDish);
    }

    const decrementHandler=(dishId)=>{
      //const customerId='03082562292';
      const customerId=customerDetail.phone;
      dispatch(decreaseQuantity(dishId));
      const selectedDish=cartTableRecord.find(dish=>dish.dish_id===dishId);
      let url=`http://${IP.ip}:3000/cart/updateQuantity/${customerId}/${dishId}`;
      let data={
          quantity: selectedDish.quantity,
          totalAmount:selectedDish.total_amount
      }
      fetch(url,{
          method:'PUT',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          body:JSON.stringify(data)
      }).then((response)=>response.json())
      .catch((error)=>console.error(error))   
      console.log("/////////// selecte Dish /////////////////")
      console.log(selectedDish);
    }

    const getQuantity=(dishId)=>{
      /*if(cartTableRecord.length<=0){
        return 1;
      }*/
      const selectedItem=cartTableRecord.find(item=>item.dish_id===dishId);
      const index=cartTableRecord.indexOf(selectedItem);
      if(index<0){
        return 1;
      }
      return selectedItem.quantity;
    }
     
     const addSubTotal=(subTotal)=>{
          setSumSubTotal(subTotal);
     }
       let countCartItems=cartTableRecord.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0);
      var deliveryCharges=20*countCartItems;
      const subSum = cartTableRecord.map(item => item.total_amount).reduce((prev, curr) => prev + curr, 0);

            //subTotal+=itemData.item.price;
            //addSubTotal(subSum)
 
    ////////////////////////////////////////////////////////////////////////////
    ////////////////    Working Here    ///////////////////////////////////////
        
    const renderCartItem=(itemData)=>{
            listOfTokens.push(itemData.item.push_token);
            listOfDishIds.push(itemData.item.dish_id);
            
            //setSumSubTotal(subTotal);
            

        return(
            <CartItem restaurantName={itemData.item.kitchen_name} dishName={itemData.item.dish_name} 
            price={itemData.item.price} image={`http://${IP.ip}:3000/images/${itemData.item.image}`}
            quantity={getQuantity(itemData.item.dish_id)}
            onIncrement={()=>incrementHandler(itemData.item.dish_id)}
            onDecrement={()=>decrementHandler(itemData.item.dish_id)}
            onSelect={()=>
              {
                console.log("Entered")
                //console.log(typeof(cartItem.dish_id));
                let url=`http://${IP.ip}:3000/cart`;
                let data={
                    itemId:itemData.item.dish_id
                }
                fetch(url,{
                    method:'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      },
                    body:JSON.stringify(data)
                }).then((response)=>response.json())
                .then((response)=>console.log(response))
                .then(()=>console.log("Item Deleted"))
                .then(()=>dispatch(removeCartItem(itemData.item.dish_id)))
                .then(()=>dispatch(removeFromCartTable(itemData.item.dish_id)))
                //.then(()=>{getUpdatedData();})
                .catch((error)=>console.log(error));
        
            }
            }
            
            
            />
        )
    }

    
        return(
          <View style={styles.screen}>

            <FlatList data={itemsInCart} renderItem={renderCartItem} keyExtractor={(item)=>item.dish_id}
          showsVerticalScrollIndicator={false}/>
            <AmountCard subTotal={subSum} deliveryCharges={deliveryCharges} grandTotal={deliveryCharges+subSum}
            proceed={true}
            onSelect={()=>{
                props.navigation.navigate({
                    routeName:'Checkout',
                    params:{
                      subTotal:subSum,
                      deliveryCharges:deliveryCharges,
                      grandTotal:deliveryCharges+subSum,
                      tokens:listOfTokens,
                      dishIds:listOfDishIds


                    }
                });
            }}
            />

          </View>
        )
    };


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
            justifyContent:'space-between'
           
        }
       
    }
)

export default CartScreen;