import React from "react";
import {Text,StyleSheet, View,Dimensions,TouchableOpacity} from 'react-native';

const CategoryTile=(props)=>{
    return(
        <TouchableOpacity style={styles.gridItem} onPress={props.onSelect}>
        <View style={{...styles.container,...{backgroundColor:props.color}}}>
            <Text style={styles.category}>{props.category}</Text>
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

export default CategoryTile;