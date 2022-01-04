import React from "react";
import { View,Text,StyleSheet, Button,Alert,TouchableOpacity,ScrollView } from "react-native";
import Colors from '../constants/Colors';
import AmountCard from "../components/amountCard";
import AddressCard from "../components/deliveryAddress";
import IP from "../constants/IP";
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import { useEffect, useState } from "react";


const CheckoutScreen=(props)=>{

    const subTotal=props.navigation.getParam('subTotal');
    const deliveryCharges=props.navigation.getParam('deliveryCharges');
    const grandTotal=props.navigation.getParam('grandTotal');
    //let today = new Date();
    //let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    
    const placeOrder=()=>{
        let url=`http://${IP.ip}:3000/order`;
        let data={
            customerId:'03082562292',
            chefId:'03154562292',
            totalAmount:grandTotal,
            status:'pending'

        }
        fetch(url,{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>ToastAndroid.show(`Order placed successfully`, ToastAndroid.SHORT))
        .catch((error)=>console.log(error));
        showAlert();

    }

        const showAlert=()=>{
            Alert.alert("You Placed the Order!",`Order#:233212\nOrdered On: 08:00:00\nTotal Items: 03\nReciever Name : Rehan Ali\nContact Number : 03082562292\nCompplete Address : Mianwali`,[{
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
            

            <AmountCard subTotal={subTotal} deliveryCharges={deliveryCharges} grandTotal={grandTotal}
            proceed={false}
            />

            <View style={styles.btnContainer}>
            <TouchableOpacity onPress={placeOrder}>
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
