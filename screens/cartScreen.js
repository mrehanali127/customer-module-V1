import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';;
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import { useEffect, useState } from "react";
import CartItem from "../components/cartItem";
import AmountCard from "../components/amountCard";


const CartScreen=()=>{

    
        return(
          <View style={styles.screen}>
            <CartItem restaurantName="Bisma Ka Kitchen" dishName="Chicken Biryani Chicken" 
            price="200" image="https://hamariweb.com/recipes/images/recipeimages/3464.jpg"
            onSelect={()=>{}}/>

            <AmountCard restaurantName="Bisma Ka Kitchen" dishName="Chicken Biryani Chicken" 
            price="200" image="https://hamariweb.com/recipes/images/recipeimages/3464.jpg"
            onSelect={()=>{}}/>

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