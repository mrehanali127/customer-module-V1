import React from "react";
import { View,Text,StyleSheet, Button,Alert,TouchableOpacity,ScrollView,ToastAndroid } from "react-native";
import Colors from '../constants/Colors';
import AmountCard from "../components/amountCard";
import AddressCard from "../components/deliveryAddress";
import IP from "../constants/IP";
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import { useEffect, useState } from "react";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';


const CheckoutScreen=(props)=>{

    const subTotal=props.navigation.getParam('subTotal');
    const deliveryCharges=props.navigation.getParam('deliveryCharges');
    const grandTotal=props.navigation.getParam('grandTotal');
    const allDishIds=props.navigation.getParam('dishIds');
    const tokens=props.navigation.getParam('tokens');
    let notificationData;
    //const [token,setToken]=useState('');
    //const [senderToken,setSenderToken]=useState('');
    //const [newOrderId,setNewOrderId]=useState(0);
    let newOrderId=0;
    let senderToken=' ';
    let responseAfterPlacement;
    //let today = new Date();
    //let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    
    useEffect(()=>{
        Permissions.getAsync(Permissions.NOTIFICATIONS)
        .then((statusObj)=>{
          if(statusObj.status!=='granted'){
            return Permissions.askAsync(Permissions.NOTIFICATIONS);
          }
          return statusObj;  
        })
        .then((statusObj)=>{
          if(statusObj.status!=='granted'){
            throw new Error('Permission not granted');
          }
        })
        .then(()=>{
           return Notifications.getExpoPushTokenAsync();
        })
        .then(response=>{
          console.log(response);
          senderToken=response.data;
          console.log(senderToken);
        })
        .catch((err)=>{
          return null;
        })
      },[]);
  
    
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
        .then((response)=>{
            responseAfterPlacement=response;
            newOrderId=responseAfterPlacement.insertId;
            console.log(newOrderId);
            addOrderDetails();
            })
        .then(()=>ToastAndroid.show(`Order placed successfully`, ToastAndroid.SHORT))
        /*
        .then(()=>{
            fetch('https://exp.host/--/api/v2/push/send',{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Accept-Encoding':'gzip,deflate',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        to:token,
                        data:sendingData,
                        title:'Order was Placed',
                        body:sendingData.chefId
                    })
                });

        })*/
        .then(()=>{
            sendNotificationsToChefs();
        })
        .catch((error)=>console.log(error));
        showAlert();
        
        
    }

            const addOrderDetails=()=>{
                console.log("Entered in addOrder Functions");
                console.log(allDishIds);
                let url=`http://${IP.ip}:3000/orderDetail`;
                let data1={
                    orderId:newOrderId,
                    dishId:allDishIds[0],
                    quantity:1,
                    totalAmount:subTotal
                }
                console.log(data1);
                fetch(url,{
                    method:'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(data1)
                })
                .then((response)=>response.json())
                .then(()=>{console.log("Till here working")})
                .then(()=>ToastAndroid.show(`Order Details have been added`, ToastAndroid.SHORT))
                .then(()=>{console.log("Order detail API Working")})
                .catch((error)=>console.log(error));
        }

        const showAlert=()=>{
            Alert.alert("You Placed the Order!",`Order#:233212\nOrdered On: 08:00:00\nTotal Items: 03\nReciever Name : Rehan Ali\nContact Number : 03082562292\nCompplete Address : Mianwali`,[{
                text:'Okey!',
                style:'cancel'
            }]);
        }

        const sendNotificationsToChefs=()=>{
            for(const token of tokens){
                fetch('https://exp.host/--/api/v2/push/send',{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Accept-Encoding':'gzip,deflate',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        to:token,
                        data:{
                            sender:senderToken,
                            reciever:token,
                            orderId:newOrderId,
                            status:false
                        },
                        title:'Order For You',
                        body:"Customer placed order for your",  
                        experienceId: "@rehan.ali/chef-module-V1",
                    })
                });
            }
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
