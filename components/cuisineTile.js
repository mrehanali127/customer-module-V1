import React from "react";
import Colors from "../constants/Colors";
import {Text,StyleSheet, View,Dimensions,TouchableOpacity} from 'react-native';



const CuisineTile=(props)=>{
    //const selectedItems=props.selected;
    //const isSelected=selectedItems.includes(props.cuisine);
    return(
        <TouchableOpacity style={{...styles.gridItem,...{width:props.width,margin:props.margin}}} onPress={props.onSelect}>
        <View style={{...styles.container,...{backgroundColor:props.selected>=0?Colors.primaryLightColor:Colors.whiteColor}}}>
            <Text style={{...styles.category,...{color:props.selected>=0?Colors.whiteColor:'#000',
            fontWeight:props.selected===props.cuisine?'bold':'normal',
            elevation:props.selected===props.cuisine?10:0}}}>{props.cuisine}</Text>
        </View>
        </TouchableOpacity>
    )

}

const styles=StyleSheet.create({
    gridItem:{
        flex:1,
        margin:10,
        height:30,
        width:80
    },

    container:{
        flex:1,
        borderRadius:15,
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0,height:2},
        shadowRadius:5, 
        elevation:3,
        paddingVertical:5,
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center'
    },
    category:{
        fontSize:12,
        textAlign:'right'
    } 

})

export default CuisineTile;