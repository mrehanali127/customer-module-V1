import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';;
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import { useEffect, useState } from "react";


const HomeScreen=()=>{

    
        return(
          <View style={styles.screen}>
              <Text>Home Screen</Text>
          </View>
        )
    };


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        }
       
    }
)

export default HomeScreen;