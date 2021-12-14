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

      useEffect(()=>{
       // const customerId=props.navigation.getParam('customerId');
       const customerId='03082562292';
        fetch(`http://${IP.ip}:3000/cart/${customerId}`)
        .then((response)=>response.json())
        .then((response)=>setCartItems(response))
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false));
      },[]);



    const renderCartItem=(itemData)=>{
        return(
            <CartItem restaurantName={itemData.item.kitchen_name} dishName={itemData.item.dish_name} 
            price={itemData.item.total_amount} image="https://hamariweb.com/recipes/images/recipeimages/3464.jpg"
            onSelect={()=>{}}/>
        )
    }

    
        return(
          <View style={styles.screen}>

            <FlatList data={cartItems} renderItem={renderCartItem} keyExtractor={(item)=>item.dish_name}
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