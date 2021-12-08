import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,SafeAreaView } from "react-native";
import Colors from '../constants/Colors';;
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/customHeaderButton";
import SearchBarHeader from "../components/headerSearchBar";
import { useEffect, useState } from "react";


const HomeScreen=()=>{

    
        return(
        <SafeAreaView>
        <View>
        <View style={styles.header}>
        <SearchBarHeader/>
        
          </View>
          </View>
          </SafeAreaView>
        )
    };

HomeScreen.navigationOptions=()=>{
    return{
        headerShown:false
    }
}


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        },
        header:{
           
            height:200
       
    }
}
)

export default HomeScreen;