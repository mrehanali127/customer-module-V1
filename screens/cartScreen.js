import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,ScrollView } from "react-native";
import Colors from '../constants/Colors';;
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import { useEffect, useState,useRef } from "react";
import CartItem from "../components/cartItem";
import AmountCard from "../components/amountCard";
import IP from "../constants/IP";

const CartScreen=(props)=>{

    const[isLoading,setLoading]=useState(true);
    const[cartItems,setCartItems]=useState([]);
    const[listedLoading,setListedLoading]=useState(true);
    const[SubTotal,setSubTotal]=useState([]);
    const[subLoading,setSubLoading]=useState(true);
    const[shortListedItems,setShortListedItems]=useState([]);
    const[sumSubTotal,setSumSubTotal]=useState(0);
    //const isMounted=useRef(false);
    var subTotal=0;
    let listOfTokens=[];
    let listOfDishIds=[];

    useEffect(()=>{
      // const customerId=props.navigation.getParam('customerId');
      //if(isMounted){
      const customerId='03082562292';
       fetch(`http://${IP.ip}:3000/cart/${customerId}`)
       .then((response)=>response.json())
       .then((response)=>setCartItems(response))
       .catch((error)=>console.error(error));
      //}
     
     },[cartItems]);

   
    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/dish`)
        .then((response)=>response.json())
        .then((response)=>setShortListedItems(response))
        .then(()=>console.log("jy"))
        .then(()=>console.log(shortListedItems))
        .catch((error)=>console.error(error))
        .finally(()=>setListedLoading(false));
        //isMounted.current=true
      },[]);

      
      
      /*
      useEffect(()=>{
        const customerId='03082562292';
         fetch(`http://${IP.ip}:3000/cart/subtotal/${customerId}`)
         .then((response)=>response.json())
         .then((response)=>setSubTotal(response))
         .then(()=>console.log(SubTotal))
         .catch((error)=>console.error(error))
         .finally(()=>setSubLoading(false));
       },[SubTotal]);*/

       let countCartItems=cartItems.length;
      var deliveryCharges=20*countCartItems;
 
    ////////////////////////////////////////////////////////////////////////////
    ////////////////    Working Here    ///////////////////////////////////////
        
    const renderCartItem=(itemData)=>{
            const dishId=itemData.item.dish_id; 
            const item=shortListedItems.filter(item=>item.dish_id===dishId);
            const cart_item=item[0];
            listOfTokens.push(cart_item.push_token);
            listOfDishIds.push(dishId);
            subTotal+=cart_item.price;
            setSumSubTotal(subTotal);
            

        return(
            <CartItem restaurantName={cart_item.kitchen_name} dishName={cart_item.dish_name} 
            price={cart_item.price} image={cart_item.image}
            onSelect={()=>
              {
                console.log("Entered")
                console.log(typeof(cart_item.dish_id));
                let url=`http://${IP.ip}:3000/cart`;
                let data={
                    itemId:dishId
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