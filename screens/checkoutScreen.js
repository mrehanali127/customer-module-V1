import React from "react";
import { View,Text,StyleSheet, Button,Alert,TouchableOpacity,ScrollView } from "react-native";
import Colors from '../constants/Colors';
import AmountCard from "../components/amountCard";
import AddressCard from "../components/deliveryAddress";
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import { useEffect, useState } from "react";


const CheckoutScreen=(props)=>{

        const showAlert=()=>{
            Alert.alert("You Placed the Order!",`Order#:.....\nOrdered On ..........\nTotal Items: ......\nReciever Name : .........\nContact Number :.........\nCompplete Address :........`,[{
                text:'Okey!',
                style:'cancel'
            }]);
        }
    
        return(
          <ScrollView>
          <View style={styles.screen}>
             
            <AddressCard/>
        
            <View style={styles.card}>
            <View> 
                <Text style={styles.paymentHeader}>Payment Option</Text>
                <Text style={styles.paymentType}>Cash On Delivery</Text>
            </View>
            </View>
            

            <AmountCard subTotal={100} deliveryCharges={20} grandTotal={120}
            proceed={false}
            />

            <View style={styles.btnContainer}>
            <TouchableOpacity onPress={showAlert}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.btnTitle}>PLACE ORDER</Text>
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
            paddingBottom:10
            
        },
        buttonContainer:{
            flexDirection:'row',
            backgroundColor:Colors.primaryColor,
            width:140,
            justifyContent:'center',
            alignItems:'center',
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
        },
        card:{
            width:'95%',
         backgroundColor:'#f5f5f5',
         borderRadius:15,
         elevation:5,
         padding:15,
         overflow:'hidden',
         marginVertical:5,
         marginHorizontal:10
       
        },
        paymentHeader:{
            fontSize:18,
            fontWeight:'bold',
            color:Colors.primaryColor
        }
       
    }
)

export default CheckoutScreen;
