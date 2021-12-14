import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,ScrollView } from "react-native";
import Colors from '../constants/Colors';;
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import { useEffect, useState } from "react";
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

    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/dish`)
        .then((response)=>response.json())
        .then((response)=>setShortListedItems(response))
        .then(()=>console.log("jy"))
        .then(()=>console.log(shortListedItems))
        .catch((error)=>console.error(error))
        .finally(()=>setListedLoading(false));
      },[]);

      useEffect(()=>{
       // const customerId=props.navigation.getParam('customerId');
       const customerId='03082562292';
        fetch(`http://${IP.ip}:3000/cart/${customerId}`)
        .then((response)=>response.json())
        .then((response)=>setCartItems(response))
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false));
      },[]);

      /*useEffect(()=>{
        const customerId='03082562292';
         fetch(`http://${IP.ip}:3000/cart/subtotal/${customerId}`)
         .then((response)=>response.json())
         .then((response)=>setSubTotal(response))
         .then(()=>console.log(SubTotal))
         .catch((error)=>console.error(error))
         .finally(()=>setSubLoading(false));
       },[]);*/
 

     
        
    const renderCartItem=(itemData)=>{
            const dishId=itemData.item.dish_id; 
            const item=shortListedItems.filter(item=>item.dish_id===dishId);
            const cart_item=item[0];

        return(
            <CartItem restaurantName={cart_item.kitchen_name} dishName={cart_item.dish_name} 
            price={cart_item.price} image={cart_item.image}
            onSelect={()=>{}}/>
        )
    }

    
        return(
          <View style={styles.screen}>

            <FlatList data={cartItems} renderItem={renderCartItem} keyExtractor={(item)=>item.dish_id}
          showsVerticalScrollIndicator={false}/>
            <AmountCard subTotal={100} deliveryCharges={20} grandTotal={120}
            proceed={true}
            onSelect={()=>{
                props.navigation.navigate({
                    routeName:'Checkout',
                    params:{

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