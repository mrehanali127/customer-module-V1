import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,ScrollView } from "react-native";
import Colors from '../constants/Colors';;
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import { useEffect, useState,useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import { manageCartItems,removeCartItem,getCartData } from "../store/actions/dishActions";
import CartItem from "../components/cartItem";
import AmountCard from "../components/amountCard";
import IP from "../constants/IP";

const CartScreen=(props)=>{

    
    const[cartItems,setCartItems]=useState([]);
    const[cartTable,setCartTable]=useState([]);
    const [isLoading,setLoading]=useState(true);
    const[sumSubTotal,setSumSubTotal]=useState(0);
    const dispatch=useDispatch();
    var subTotal=0;
    let listOfTokens=[];
    let listOfDishIds=[];

    useEffect(()=>{
      // const customerId=props.navigation.getParam('customerId');
      const customerId='03082562292';
      fetch(`http://${IP.ip}:3000/cart/dishes/${customerId}`)
       .then((response)=>response.json())
       .then((response)=>setCartItems(response))
       .then(()=>dispatch(manageCartItems(cartItems)))
       .then(()=>console.log("running"))
       .then(()=>{
       })
       .catch((error)=>console.error(error))
       fetch(`http://${IP.ip}:3000/cart/${customerId}`)
      .then((response)=>response.json())
      .then((response)=>setCartTable(response))
      .then(()=>dispatch(getCartData(cartTable)))
      .finally(()=>setLoading(false));
     },[isLoading]);

     /*
     useEffect(()=>{
      const customerId='03082562292';
      fetch(`http://${IP.ip}:3000/cart/${customerId}`)
      .then((response)=>response.json())
      .then((response)=>setCartTable(response))
      .then(()=>dispatch(getCartData(cartTable)))
      .catch((error)=>console.error(error))
      .finally(()=>setLoading(false));
      
    },[isLoading]);*/

    const cartTableRecord=useSelector(state=>state.dish.cartTableData);
     const itemsInCart=useSelector(state=>state.dish.cartItems);
    
     /*
     const getUpdatedData=()=>{
      const customerId='03082562292';
      fetch(`http://${IP.ip}:3000/cart/dishes/${customerId}`)
       .then((response)=>response.json())
       .then((response)=>setCartItems(response))  
       .catch((error)=>console.error(error));
     }*/

       let countCartItems=itemsInCart.length;
      var deliveryCharges=20*countCartItems;
 
    ////////////////////////////////////////////////////////////////////////////
    ////////////////    Working Here    ///////////////////////////////////////
        
    const renderCartItem=(itemData)=>{
            listOfTokens.push(itemData.item.push_token);
            listOfDishIds.push(itemData.item.dish_id);
            subTotal+=itemData.item.price;
            setSumSubTotal(subTotal);
            

        return(
            <CartItem restaurantName={itemData.item.kitchen_name} dishName={itemData.item.dish_name} 
            price={itemData.item.price} image={itemData.item.image}
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
                //.then(()=>{getUpdatedData();})
                .catch((error)=>console.log(error));
        
            }
            }/>
        )
    }

    
        return(
          <View style={styles.screen}>

            <FlatList data={itemsInCart} renderItem={renderCartItem} keyExtractor={(item)=>item.dish_id}
          showsVerticalScrollIndicator={false}/>
            <AmountCard subTotal={sumSubTotal} deliveryCharges={deliveryCharges} grandTotal={deliveryCharges+sumSubTotal}
            proceed={true}
            onSelect={()=>{
                props.navigation.navigate({
                    routeName:'Checkout',
                    params:{
                      subTotal:sumSubTotal,
                      deliveryCharges:deliveryCharges,
                      grandTotal:deliveryCharges+sumSubTotal,
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