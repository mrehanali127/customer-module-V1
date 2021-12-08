import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import React,{useState} from "react";
import { View,StyleSheet,Text,TextInput,Dimensions } from "react-native";

const SearchBarHeader=props=>{
    const [value,setValue]=useState("");
    return(
        <View style={styles.header}>
            <View style={styles.searchContainer}>
                <View style={styles.searchButton}>
                <TextInput style={styles.input} value={value} onChangeText={(text)=>setValue(text)} placeholder="Search Food"
                 />
                <Ionicons name="search" size={24} color="white"/>
                </View>
                <Ionicons name="ios-notifications" size={24} color="white"/>
            </View>
        </View>
    )

}

const styles=StyleSheet.create({

    header:{
        flex:1,
        
    },
    searchContainer:{
        padding:5,
        paddingTop:40,
        flexDirection:'row',
        justifyContent:'space-around',
        elevation:5,
        backgroundColor:Colors.primaryColor,
    
      
    },
    searchButton:{
        width:'70%',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    input:{
        width:'85%',
        backgroundColor:'#e6e6e6',
        borderRadius:10,
        paddingHorizontal:10,
        
    }
})

export default SearchBarHeader;