import React,{useEffect,useState} from "react";
import { Text,View,StyleSheet,TouchableOpacity,Image,ImageBackground} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from "../constants/Colors";


const  OrderCard=props=>{
   
    return(
        <View style={styles.notificationCard}>
                {props.forOrderScreen &&
                 <View>
                <View style={{width:'100%',flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.title}>Order Id: #{props.orderId}</Text>
                <TouchableOpacity onPress={props.onViewDetails}>
                <Text style={{...styles.title,color:Colors.primaryColor,textDecorationLine:'underline'}}>View Details</Text>
                </TouchableOpacity>
                </View>
                <Text style={styles.title}>Your Newly Placed Order</Text>
                </View>
                }
                <View style={styles.notificationContainer}>
                <Text style={{...styles.subTitle}}>Order Status</Text>
                <Text style={{...styles.subTitle}}>{props.status}</Text>
                </View>
                {props.forOrderScreen &&
                <View style={styles.notificationContainer}>
                <Text style={{...styles.subTitle}}>Order Placed At</Text>
                <Text style={{...styles.subTitle}}>{props.timeOfOrder.substring(0, 10)} {props.timeOfOrder.substring(11, 16)}</Text>
                </View>
                }
                
            {props.currentStatus==='pending' &&
            <View>
            {props.forOrderScreen &&
            <View style={styles.btnContainer}>
            <TouchableOpacity onPress={props.onCancel}>
                <View style={{...styles.buttonContainer}}>
                    <Text style={styles.btnTitle}>Cancel</Text>
                </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={props.onSelect}>
                <View style={{...styles.buttonContainer}}>
                    <Text style={styles.btnTitle}>Confirm</Text>
                </View>
            </TouchableOpacity> */}
            </View>
            }
            </View>
            }


                  
            {props.currentStatus==='delivered' &&
            <View>
            {props.forOrderScreen &&
            <View>
            <View style={styles.notificationContainer}>
            <Text style={{...styles.subTitle}}>How was your experience. Kindly rate us!!</Text>
            </View>
            <View style={styles.btnContainer}>
            <TouchableOpacity onPress={props.onRate}>
                <View style={{...styles.buttonContainer}}>
                    <Text style={styles.btnTitle}>Rate Us</Text>
                </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={props.onSelect}>
                <View style={{...styles.buttonContainer}}>
                    <Text style={styles.btnTitle}>Confirm</Text>
                </View>
            </TouchableOpacity> */}
            </View>
            </View>
            }
            </View>
            }



        </View>
    )
};

const styles=StyleSheet.create({


    notificationCard:{
         width:'95%',
         backgroundColor:'#f5f5f5',
         borderRadius:15,
         elevation:5,
         padding:15,
         overflow:'hidden',
         marginVertical:5,
         marginHorizontal:10
       
    },   
    
    title:{
        fontSize:16,
        fontWeight:"bold",
        color:'#000'
    },
    subTitle:{
        fontSize:16,
        color:"#000"
    },
    notificationContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    buttonContainer:{
        backgroundColor:Colors.primaryColor,
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        width:70,
        borderRadius:10
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingTop:5
    },
    btnTitle:{
        color:Colors.whiteColor,
        fontSize:16,
    }


});

export default OrderCard;