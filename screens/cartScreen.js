import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,ScrollView } from "react-native";
import Colors from '../constants/Colors';;
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import { useEffect, useState,useRef } from "react";
import CartItem from "../components/cartItem";
import AmountCard from "../components/amountCard";
import IP from "../constants/IP";

const CartScreen=(props)=>{

    
    const[cartItems,setCartItems]=useState([]);
    const[sumSubTotal,setSumSubTotal]=useState(0);
    const isMounted=useRef(false);
    var subTotal=0;
    let listOfTokens=[];
    let listOfDishIds=[];

    useEffect(()=>{
      // const customerId=props.navigation.getParam('customerId');
      const customerId='03082562292';
      fetch(`http://${IP.ip}:3000/cart/dishes/${customerId}`)
       .then((response)=>response.json())
       .then((response)=>setCartItems(response))
       .catch((error)=>console.error(error));
   
     
     },[cartItems]);

     const getUpdatedData=()=>{
      const customerId='03082562292';
      fetch(`http://${IP.ip}:3000/cart/dishes/${customerId}`)
       .then((response)=>response.json())
       .then((response)=>setCartItems(response))
       
       .catch((error)=>console.error(error));
     }

    /*
    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/dish`)
        .then((response)=>response.json())
        .then((response)=>setShortListedItems(response))
        .then(()=>console.log("jy"))
        .then(()=>console.log(shortListedItems))
        .catch((error)=>console.error(error))
        .finally(()=>setListedLoading(false));
        isMounted.current=true
      },[]);
      */
      

       let countCartItems=cartItems.length;
      var deliveryCharges=20*countCartItems;
 
    ////////////////////////////////////////////////////////////////////////////
    ////////////////    Working Here    ///////////////////////////////////////
        
    const renderCartItem=(itemData)=>{
            //const dishId=itemData.item.dish_id; 
            //const item=shortListedItems.filter(item=>item.dish_id===dishId);
            //const cart_item=item[0];
            //setCartItem(item[0]);
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
                .then(()=>{
                  getUpdatedData();
                })
                .catch((error)=>console.log(error));
        
            }
            }/>
        )
    }

    
        return(
          <View style={styles.screen}>

            <FlatList data={cartItems} renderItem={renderCartItem} keyExtractor={(item)=>item.dish_id}
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