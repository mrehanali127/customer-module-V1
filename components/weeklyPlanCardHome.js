import { Text,View,StyleSheet,TouchableOpacity,Image,ImageBackground} from 'react-native';
import Colors from "../constants/Colors";
import React from "react";
import {LinearGradient} from 'expo-linear-gradient';


const  WeeklyPlanCardHome=props=>{
    return(
        <View style={styles.planCard}>
                <LinearGradient colors={["#ffffff","transparent",Colors.primaryColor]} style={styles.gradient}>
                <Text style={styles.title}>Tired of placing order daily!!</Text>
                <Text style={styles.subTitle}>Let's take a look at our Weekly Plans, which are full of delightful dishes.</Text>
                <View style={styles.btnContainer}>
                <TouchableOpacity onPress={props.onSelect}>
                    <View style={{...styles.buttonContainer}}>
                        <Text style={styles.btnTitle}>View Plans</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </LinearGradient>
        </View>
    )
};

const styles=StyleSheet.create({


    planCard:{
         width:'95%',
         backgroundColor:'#f5f5f5',
         borderRadius:15,
         elevation:5,
        
         overflow:'hidden',
         marginVertical:5,
         marginHorizontal:10
       
    }, 
    gradient:{
        padding:15,
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
        backgroundColor:Colors.primaryLightColor,
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        width:130,
        marginHorizontal:5,
        borderRadius:10
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingTop:5,
        elevation:10,
    },
    btnTitle:{
        color:Colors.whiteColor,
        fontSize:16,
    }


});

export default WeeklyPlanCardHome;