import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';;
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import { useEffect, useState } from "react";


const FavoritesScreen=()=>{

    
        return(
          <View style={styles.screen}>
              <Text>Favorites Screen</Text>
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

export default FavoritesScreen;
