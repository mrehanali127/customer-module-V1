import { Text,View,StyleSheet,TouchableOpacity,Image,ImageBackground} from 'react-native';
import Colors from "../constants/Colors";
import React from "react";


const  NotificationCard=props=>{
    return(
        <View style={styles.notificationCard}>
                <Text style={styles.title}>{props.notTitle}</Text>
                <Text style={styles.subTitle}>Your Order has been confirmed by</Text>
                <Text style={styles.subTitle}>{props.kitchenName}</Text>

                <Text style={{...styles.title,color:Colors.primaryColor}}>Order Details</Text>
                <View style={styles.notificationContainer}>
                <Text style={{...styles.subTitle}}>{props.orderedDish}</Text>
                <Text style={{...styles.subTitle}}>{props.servingSize} Person</Text>
                </View>
                {/*<View style={styles.notificationContainer}>
                <Text style={{...styles.subTitle}}>Order Confirmed At</Text>
                <Text style={{...styles.subTitle}}>{props.timeOfConfirmatiom}</Text>
                </View>
    */}


           
            {props.notSeen &&
            <View style={styles.btnContainer}>
            <TouchableOpacity onPress={props.onSelect}>
                <View style={{...styles.buttonContainer}}>
                    <Text style={styles.btnTitle}>Okey!</Text>
                </View>
            </TouchableOpacity>
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
        marginHorizontal:5,
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

export default NotificationCard;