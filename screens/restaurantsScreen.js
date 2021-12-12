import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import KitchenCard from "../components/kitchenCard1";
import IP from "../constants/IP";

import { useEffect, useState } from "react";


const RestaurantsScreen=(props)=>{
    const [isLoading,setLoading]=useState(true);
    const [kitchensData,setkitchensData]=useState([]);

    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/kitchen`)
        .then((response)=>response.json())
        .then((response)=>setkitchensData(response))
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false));
      },[]);

      const renderKitchenCard=(itemData)=>{
        return(
           <KitchenCard kitchenName={itemData.item.kitchen_name} kitchenLogo={itemData.item.logo} startTime={itemData.item.start_time}
            endTime={itemData.item.end_time}
            onSelect={()=>{
                props.navigation.navigate({
                    routeName:'RestaurantDetail',
                    params:{
                      kitchenName:itemData.item.kitchen_name,
                      kitchenLogo:itemData.item.logo,
                      startTime:itemData.item.start_time,
                      endTime:itemData.item.end_time


                    }
                });
               }
            }/>
        )
    }
    return(
       
        <View style={styles.container}>
            <View style={styles.kitchenContainer}>
            <FlatList data={kitchensData} renderItem={renderKitchenCard} keyExtractor={(item)=>item.kitchen_name}
            showsVerticalScrollIndicator={false}/>
            </View>
        </View>
        
        )
}
    

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

export default RestaurantsScreen;