import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,SafeAreaView, ScrollView} from "react-native";
import Colors from '../constants/Colors';;
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/customHeaderButton";
import SearchBarHeader from "../components/headerSearchBar";
import FoodItem from "../components/foodItem";
import IP from "../constants/IP";
import { useEffect, useState } from "react";


const HomeScreen=(props)=>{

    const [isLoading,setLoading]=useState(true);
    const [mealsData,setmealsData]=useState([]);

    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/dish`)
        .then((response)=>response.json())
        .then((response)=>setmealsData(response))
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false));
      },[]);

    
      const renderFoodItem=(itemData)=>{
        return(
           <FoodItem title={itemData.item.dish_name} imageUrl={itemData.item.image} kitchenName={itemData.item.kitchen_name}
            price={itemData.item.price}
            onSelect={()=>{
                
                props.navigation.navigate({
                    routeName:'FoodDetail',
                    params:{
                        mealId:itemData.item.dish_id
                    }
                });
               }
            }/>
        )
    }


        return(
       
        <View style={styles.container}>
        <View style={styles.header}>
        <SearchBarHeader/>
        
          </View>
          <View style={styles.mealsContainer}>
          
          <FlatList data={mealsData} renderItem={renderFoodItem}/>
          
          </View>
          </View>
        
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
           
            height:125,
            flexDirection:'column'
       
    },
    categoriesScrollView:{
        width:'100%',
        height:200,
        paddingTop:400
    },
    container:{
        flex:1,
        flexDirection:'column',
      
    },
    mealsContainer:{
       width:'100%'
    }
}
)

export default HomeScreen;