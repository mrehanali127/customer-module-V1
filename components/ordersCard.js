import React,{useEffect,useState} from "react";
import { Text,View,StyleSheet,TouchableOpacity,Image,ImageBackground} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Colors from "../constants/Colors";
import OrderBox from "./orderBox";


const  OrdersCard=props=>{
   
    return(
        <View style={styles.orderCard}>
            <View style={styles.boxesContainer}>
                <TouchableOpacity onPress={props.onOrders}>
                <OrderBox number={props.myOrders} title={props.box1}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.onPlans}>
                <OrderBox number={props.myPlans} title={props.box2} onSelect={props.onPlans}/>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles=StyleSheet.create({


    orderCard:{
         width:'95%',
         //backgroundColor:'#f5f5f5',
         backgroundColor:Colors.whiteColor,
         borderRadius:15,
         elevation:5,
         padding:15,
         overflow:'hidden',
         marginVertical:5,
         marginHorizontal:10
       
    }, 
    orderHeader:{
        justifyContent:'center',
        alignItems:'center'
    }, 
    headerText:{
        color:Colors.primaryColor,
        fontSize:16,
        fontWeight:'bold'
    }, 
    boxesContainer:{ 
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },


});

export default OrdersCard;