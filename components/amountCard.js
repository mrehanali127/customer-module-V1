import React,{useEffect,useState} from "react";
import { Text,View,StyleSheet,TouchableOpacity,Image,ImageBackground} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Colors from "../constants/Colors";


const  AmountCard=props=>{
   
    return(
        <View style={styles.amountCard}>
            <View style={styles.amountContainer}> 
                <Text style={styles.amountSub}>Sub Total :</Text>
                <Text style={styles.amountSub}>Rs. {props.deliveryCharges===0?0:props.subTotal}</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.amountSub}>Delivery Charges :</Text>
                <Text style={styles.amountSub}>Rs. {props.deliveryCharges}</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.amount}>Grand Total :</Text>
                <Text style={styles.amount}>Rs. {props.deliveryCharges===0 ?0:props.grandTotal}</Text>
            </View>
            {props.proceed &&
            <View style={styles.btnContainer}>
            <TouchableOpacity onPress={props.onSelect} disabled={props.deliveryCharges===0?true:false}>
                <View style={{...styles.buttonContainer,...{opacity:props.deliveryCharges===0?0.5:1}}}>
                    <Text style={styles.btnTitle}>PROCEED</Text>
                    <FontAwesome5 name="arrow-right" size={18} color={Colors.whiteColor} />
                </View>
            </TouchableOpacity>
            </View>
            }
        </View>
    )
};

const styles=StyleSheet.create({


    amountCard:{
         width:'95%',
         backgroundColor:'#f5f5f5',
         borderRadius:15,
         elevation:5,
         padding:15,
         overflow:'hidden',
         marginVertical:5,
         marginHorizontal:10
       
    },   
    plus:{
        backgroundColor:Colors.primaryColor,
        width:40,
        borderTopLeftRadius:15,
        borderBottomLeftRadius:15,
        alignItems:'center'
    },
    minus:{
        backgroundColor:Colors.primaryColor,
        width:40,
        borderBottomEndRadius:15,
        borderTopEndRadius:15,
        alignItems:'center'
    },
    incDec:{
        fontSize:20,
        color:Colors.whiteColor
    },
    counter:{
        backgroundColor:Colors.primaryColor,
        width:40,
        alignItems:'center'
    },
    itemCount:{
        flexDirection:'row',
    },
    amount:{
        fontSize:16,
        fontWeight:"bold",
        color:'#000'
    },
    amountSub:{
        fontSize:16,
        color:"#000"
    },
    amountContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
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


});

export default AmountCard;