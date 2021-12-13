import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,ScrollView } from "react-native";
import Colors from '../constants/Colors';
import AmountCard from "../components/amountCard";
import AddressCard from "../components/deliveryAddress";
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import { useEffect, useState } from "react";


const CheckoutScreen=(props)=>{

    
        return(
          <ScrollView>
          <View style={styles.screen}>
               <AmountCard subTotal={100} deliveryCharges={20} grandTotal={120}
            proceed={false}
            />
            <AddressCard/>
            <View style={styles.btnContainer}>
            <TouchableOpacity onPress={props.onSelect}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.btnTitle}>PROCEED</Text>
                </View>
            </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
        )
    };


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
            
        },
        buttonContainer:{
            flexDirection:'row',
            backgroundColor:Colors.primaryColor,
            width:120,
            justifyContent:'center',
            padding:5,
            borderRadius:20
        },
        btnContainer:{
            flexDirection:'row',
            justifyContent:'center',
            paddingTop:10
        },
        btnTitle:{
            color:Colors.whiteColor,
            fontSize:16,
           
            paddingEnd:10
        }
       
    }
)

export default CheckoutScreen;
