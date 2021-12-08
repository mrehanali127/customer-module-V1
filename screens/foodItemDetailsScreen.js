import React,{useEffect,useState,useCallback} from "react";
import { ScrollView, View,Text,StyleSheet, Button,Image} from "react-native";
import Colors from "../constants/Colors";
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from '../components/customHeaderButton';
import IP from "../constants/IP";

const FoodItemDetailsScreen=(props)=>{

    const[selectedMeal,setSelectedMeal]=useState([]);
    const mealId=props.navigation.getParam('mealId');

    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/dish/${mealId}`)
        .then((response)=>response.json())
        .then((response)=>setSelectedMeal(response))
        .catch((error)=>console.error(error));
      },[]);
    

    return(
        <ScrollView>
        <Image source={{uri:selectedMeal[0].image}} style={styles.image}/>
        <View style={styles.details}>
            <Text>{selectedMeal[0].kitchen_name}</Text>
            <Text>{selectedMeal[0].price}</Text>
            <Text>{selectedMeal[0].cat_name}</Text>
        </View>
        <Text style={styles.title}>Description</Text>
        <View>
       <Text style={styles.description}>
           {selectedMeal[0].description}
       </Text>
        </View>
    </ScrollView>
 )
};



const styles=StyleSheet.create(
 {
    image:{
         width:'100%',
         height:200
    },
    details:{
        flexDirection:'row',
        padding:15, 
        justifyContent:'space-around'

    },
    title:{
         fontSize:20,
         textAlign:'center'
    },
    listItem:{
        marginVertical:5,
        marginHorizontal:20,
        borderColor:'#ccc',
        borderWidth:1,
        padding:10
    },
    description:{
        width:'80%',
        textAlign:'center',
        height:'50%'
    }
 }
    )



export default FoodItemDetailsScreen;
