import React,{useEffect,useState} from "react";
import { Text,View,StyleSheet,TouchableOpacity,Image,ImageBackground} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Colors from "../constants/Colors";
import IP from "../constants/IP";


const  CartItem=props=>{


   
    return(
        <View style={styles.cartItem}>
        <View style={styles.itemHeader}>
            <View style={styles.imageContainer}>
            <Image source={{uri:props.image}} style={styles.image} resizeMode="cover"/>
        </View>
        <View style={styles.itemInfo}>
            <Text style={styles.dishName}>{props.dishName}</Text>
            <Text style={styles.restaurantName}>{props.restaurantName}</Text>
            <Text style={styles.price}>Rs. {props.price}</Text>
            <View style={styles.buttonsContainer}>
            <View>
                <View style={styles.itemCount}>
                    <TouchableOpacity>
                    <View style={styles.minus}><Text style={styles.incDec}>-</Text></View>
                    </TouchableOpacity>
                    <View style={styles.counter}><Text style={styles.incDec}>1</Text></View>
                    <TouchableOpacity>
                    <View style={styles.plus}><Text style={styles.incDec}>+</Text></View>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.deleteIcon} onPress={props.onSelect}>
            <AntDesign name="delete" size={20} color={Colors.primaryColor}  />
            </TouchableOpacity>
            </View>
        </View>
        </View>
        </View>
    )
};

const styles=StyleSheet.create({


    cartItem:{
         height:130,
         width:'95%',
         backgroundColor:'#f5f5f5',
         borderRadius:15,
         elevation:5,
         overflow:'hidden',
         marginVertical:5,
         marginHorizontal:10
       
    },
    itemHeader:{
        height:'100%',
        width:'100%',
        padding:15,
        flexDirection:'row',
      
    },
    imageContainer: {
        width:100,
        height:100,
        borderRadius:10,
        overflow:'hidden',
        marginEnd:10     
    },
    image:{
        width:'100%',
        height:'100%',
    },
    itemInfo:{
        flexDirection:'column'
    },
    numDishes:{
        fontSize:16,
        color:Colors.lightBlack
    },
    dishes:{
        color:Colors.lightBlack
    },
    moreDetails:{
        marginHorizontal:20,
        paddingHorizontal:5
    },
    dishName:{
        fontSize:16,
        color:'#000',
        paddingTop:10,
        fontWeight:"bold"
    },
    restaurantName:{
        fontSize:16,
        color:Colors.lightBlack
    },
    price:{
        fontSize:14,
        color:Colors.primaryColor,
        fontWeight:"bold"
    },
    buttonsContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    minus:{
        backgroundColor:Colors.primaryColor,
        width:40,
        borderTopLeftRadius:15,
        borderBottomLeftRadius:15,
        alignItems:'center'
    },
    plus:{
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
    deleteIcon:{
        width:'30%'
    }


});

export default CartItem;