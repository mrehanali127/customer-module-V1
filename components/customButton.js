import React from "react";
import {Text,StyleSheet, View,Dimensions,TouchableOpacity} from 'react-native';
import Colors from "../constants/Colors";

const CustomButton=(props)=>{
    return(
        <TouchableOpacity style={styles.buttonItem} onPress={props.onSelect}>
        <View style={{...styles.container,...{backgroundColor:props.color}}}>
            <Text style={styles.category}>{props.title}</Text>
        </View>
        </TouchableOpacity>
    )

}

const styles=StyleSheet.create({
    buttonItem:{
        flex:1,
        marginStart:90,
        marginEnd:20,
        height:30,
        width:60
    },

    container:{
        borderRadius:20,
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0,height:2},
        shadowRadius:3, 
        elevation:2,
        paddingVertical:5,
        paddingHorizontal:5,
        justifyContent:'center',
        alignItems:'center'
    },
    category:{
        fontSize:14,
        textAlign:'right',
        color:Colors.whiteColor
    } 

})

export default CustomButton;