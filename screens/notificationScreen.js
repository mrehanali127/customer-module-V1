import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import { useEffect, useState } from "react";
import NotificationCard from "../components/notificationCard";

import IP from '../constants/IP';


const NotificationScreen=(props)=>{

    const [isLoading,setLoading]=useState(true);
    const [notificationsData,setNotificationsData]=useState([]);


    useEffect(()=>{
        /*
        let fullName,dishName,orderedTime,servingSize;

        async function getCustomerName(id){
            const res= await fetch(`http://${IP.ip}:3000/order/customerRecord/${id}`);
                const response=await res.json();
                let fname=response[0].firstname;
                let lname=response[0].lastname;
                fullName=`${fname} ${lname}`;
                //console.log(fullName);
                //return fullName;
         
        }

        async function getDishName(id){
            const res= await fetch(`http://${IP.ip}:3000/order/dishRecord/${id}`)
                const response=await res.json();
                //console.log(response[0].dish_name);
                dishName=response[0].dish_name;        
            
        }

        async function getOrderedTime(id){
            const res=await fetch(`http://${IP.ip}:3000/order/time/${id}`)
            const response=await res.json();
                orderedTime=response[0].time;    
        }

        async function getServingSize(id){
            const res=await fetch(`http://${IP.ip}:3000/order/dishQuantity/${id}`)
            const response=res.json();
                //console.log(response[0]);
                servingSize=response[0].quantity;
                //formated=orderedTime.format("dd/mm/yyyy hh:MM:ss");  
                //console.log(formated);      
        }*/


        let recieverId='ExponentPushToken[7Zdw71PH2x77j3z7_tvmMz]';
        fetch(`http://${IP.ip}:3000/notifications/customer/customerNotifications/${recieverId}`)
        .then((response)=>response.json())
        .then((response)=>setNotificationsData(response))
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false));
        
      },[]);



       const renderNotificationCard=(itemData)=>{
            
        return(
            <NotificationCard notificationTitle="Hey, Come here Its order for you!!"
            kitchenName={itemData.item.kitchen_name}
            orderedDish={itemData.item.dish_name}
            //timeOfConfirmation={confirmedTime}
            servingSize={itemData.item.quantity}
            notSeen
            onSelect={()=>{
            }}
           />
           )
       }

    
        return(
            <View style={styles.container}>
            <View style={styles.kitchenContainer}>
            <FlatList data={notificationsData} renderItem={renderNotificationCard} keyExtractor={(item)=>item.not_id}
            showsVerticalScrollIndicator={false}/>
            </View>
        </View>
        )
    };


const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            flexDirection:'column',
            height:'100%'
          
        },
        kitchenContainer:{
           width:'100%',
          
        }
       
    }
)

export default NotificationScreen;
