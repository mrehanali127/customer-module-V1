import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';;
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import { useEffect, useState } from "react";
import * as SMS from 'expo-sms';


const ProfileScreen=()=>{

    const sendMessage= async ()=>{
        const isAvailable=await SMS.isAvailableAsync();
        if(isAvailable){
        const {result} = await SMS.sendSMSAsync(
            '03082562292',
            'Hello Dear Customer!'
        );
        console.log(result);
        }
        else{
            console.log("Error in accessing SMS");
        }
    }

    
        return(
          <View style={styles.screen}>
              <Text>Profile Screen</Text>
              <View style={styles.btnContainer}>
            {/** 
            <TouchableOpacity onPress={sendMessage}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.btnTitle}>Send Message</Text>
                </View>
            </TouchableOpacity>
            */}
            </View>
          </View>
        )
    };


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        },
        buttonContainer:{
            flexDirection:'row',
            backgroundColor:Colors.primaryColor,
            width:140,
            justifyContent:'center',
            alignItems:'center',
            padding:5,
            borderRadius:20
        },
        btnContainer:{
            flexDirection:'row',
            justifyContent:'center',
            paddingTop:10
        },
        btnTitle:{
            color:Colors.whiteColor,
            fontSize:16,
            paddingEnd:10
        },
       
    }
)

export default ProfileScreen;