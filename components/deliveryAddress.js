import React,{useEffect,useState} from "react";
import { Text,View,StyleSheet,TouchableOpacity,Image,ImageBackground,TextInput} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Colors from "../constants/Colors";


const  AddressCard=props=>{
   
    return(
        <View style={styles.addressCard}>
            <View style={styles.addressDetails}> 
                <Text style={styles.cardTitle}>Delivery Address</Text>     
            </View>
            <View style={styles.addressDetails}>
                <Text style={styles.addressInfo}>First Name :</Text>
                <TextInput style={styles.input} defaultValue={props.firstname} editable={false}/>
            </View>
            <View style={styles.addressDetails}>
                <Text style={styles.addressInfo}>Last Name :</Text>
                <TextInput style={styles.input} defaultValue={props.lastname} editable={false}/>
            </View>
            <View style={styles.addressDetails}>
                <Text style={styles.addressInfo}>Phone No  :</Text>
                <TextInput style={styles.input} defaultValue={props.phone} editable={false}/>
            </View>

            <View>
                <Text style={styles.addressInfo}>Complete Address :</Text>
                <TextInput style={styles.inputLines} defaultValue={props.address} multiline={true}/>
            </View>      
        </View>
    )
};

const styles=StyleSheet.create({


    addressCard:{
         width:'95%',
         backgroundColor:'#f5f5f5',
         borderRadius:15,
         elevation:5,
         padding:15,
         overflow:'hidden',
         marginVertical:5,
         marginHorizontal:10
       
    },   
   
    addressDetails:{
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    cardTitle:{
        fontSize:18,
        fontWeight:"bold",
        color:Colors.primaryColor

    },
    addressInfo:{
        fontSize:16,
        color:'#000',
        marginEnd:10
    },
    input:{
        borderBottomWidth : 1,
        width:200,
        paddingVertical:0
    },
    inputLines:{
        width:300,
        borderBottomWidth:1,
        paddingVertical:0
    }


});

export default AddressCard;