import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import { useEffect, useState } from "react";
import NotificationCard from "../components/notificationCard";

import IP from '../constants/IP';


const NotificationScreen=(props)=>{

    const [isLoading,setLoading]=useState(true);
    const [kitchenName,setKitchenName]=useState('');
    const [dishName,setDishName]=useState('');
    const [confirmedTime,setConfirmedTime]=useState('');
    const [noPlates,setNoOfPlates]=useState(0);
    const [notificationsData,setNotificationsData]=useState([]);

    /*
    const getCustomerName=(id)=>{
            fetch(`http://${IP.ip}:3000/order/customerRecord/${id}`)
            .then((response)=>response.json())
            .then((response)=>{
                setFirstName(response[0].firstname);
                setLastName(response[0].lastname);
            })
            .catch((error)=>console.error(error))
    }

    const getDishName=(id)=>{
        fetch(`http://${IP.ip}:3000/order/dishRecord/${id}`)
        .then((response)=>response.json())
        .then((response)=>{
            console.log(response[0]);
            setDishName(response[0].dish_name);        
        })
        .catch((error)=>console.error(error))
}
    
        const getOrderedTime=(id)=>{
            fetch(`http://${IP.ip}:3000/order/time/${id}`)
            .then((response)=>response.json())
            .then((response)=>{
                //console.log(response[0]);
                setOrderedTime(response[0].time);
                //formated=orderedTime.format("dd/mm/yyyy hh:MM:ss");  
                //console.log(formated);      
            })
            .catch((error)=>console.error(error))
        }

        const getServingSize=(id)=>{
            fetch(`http://${IP.ip}:3000/order/dishQuantity/${id}`)
            .then((response)=>response.json())
            .then((response)=>{
                //console.log(response[0]);
                setNoOfPlates(response[0].quantity);
                //formated=orderedTime.format("dd/mm/yyyy hh:MM:ss");  
                //console.log(formated);      
            })
            .catch((error)=>console.error(error))
        }
        */

    useEffect(()=>{
        let recieverId='ExponentPushToken[7Zdw71PH2x77j3z7_tvmMz]';
        fetch(`http://${IP.ip}:3000/notifications/customerNotifications/${recieverId}`)
        .then((response)=>response.json())
        .then((response)=>setNotificationsData(response))
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false));
      },[]);



       const renderNotificationCard=(itemData)=>{
            //getCustomerName(itemData.item.order_id);
            //getDishName(itemData.item.order_id);
            //getOrderedTime(itemData.item.order_id);
            //getServingSize(itemData.item.order_id);
        return(
            <NotificationCard notificationTitle="Hey, Come here Its order for you!!"
            kitchenName={kitchenName}
            orderedDish={dishName}
            timeOfConfirmation={confirmedTime}
            servingSize={noPlates}
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
