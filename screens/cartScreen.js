import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,ScrollView } from "react-native";
import Colors from '../constants/Colors';;
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import { useEffect, useState } from "react";
import CartItem from "../components/cartItem";
import AmountCard from "../components/amountCard";


const CartScreen=(props)=>{

    
        return(
          <View style={styles.screen}>
            <ScrollView>
            <CartItem restaurantName="Bisma Ka Kitchen" dishName="Chicken Biryani Chicken" 
            price="200" image="https://hamariweb.com/recipes/images/recipeimages/3464.jpg"
            onSelect={()=>{}}/>

<CartItem restaurantName="Bisma Ka Kitchen" dishName="Chicken Biryani Chicken" 
            price="200" image="https://hamariweb.com/recipes/images/recipeimages/3464.jpg"
            onSelect={()=>{}}/>

<CartItem restaurantName="Bisma Ka Kitchen" dishName="Chicken Biryani Chicken" 
            price="200" image="https://hamariweb.com/recipes/images/recipeimages/3464.jpg"
            onSelect={()=>{}}/>

<CartItem restaurantName="Bisma Ka Kitchen" dishName="Chicken Biryani Chicken" 
            price="200" image="https://hamariweb.com/recipes/images/recipeimages/3464.jpg"
            onSelect={()=>{}}/>
</ScrollView>
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