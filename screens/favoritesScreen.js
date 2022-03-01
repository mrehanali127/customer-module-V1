import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';;
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import FoodItem from "../components/foodItem";
import { manageFavorites } from "../store/actions/dishActions";
import IP from "../constants/IP";

const FavoritesScreen=(props)=>{

    const [isLoading,setLoading]=useState(true);
    const [favIds,setFavIds]=useState([]);
   
    const meals=useSelector(state=>state.dish.Dishes);
    const customerDetail=useSelector(state=>state.dish.customerDetails);
    const dispatch=useDispatch();
   
    useEffect(()=>{
        const customerId=customerDetail.phone;
        fetch(`http://${IP.ip}:3000/customer/favorites/${customerId}`)
        .then((response)=>response.json())
        .then((response)=>setFavIds(response))
        .then(()=>dispatch(manageFavorites(favIds)))
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false));
      },[isLoading]);
    
        //const meals=useSelector(state=>state.dish.Dishes);
        const favoriteMeals=[];
        const favoritesIds=useSelector(state=>state.dish.favoritesIds);
        for(let i=0;i<favoritesIds.length;i++){
            console.log(favoritesIds[i].dish_id);
            favoriteMeals.push(meals.filter(food=>food.dish_id===favoritesIds[i].dish_id)[0])
        }
        console.log(favoriteMeals)
    

      const renderFoodItem=(itemData)=>{
        return(
           <FoodItem title={itemData.item.dish_name} imageUrl={`http://${IP.ip}:3000/images/${itemData.item.image}`} kitchenName={itemData.item.kitchen_name}
            price={itemData.item.price}
            onSelect={()=>{    
                props.navigation.navigate({
                    routeName:'FoodDetail',
                    params:{
                        mealId:itemData.item.dish_id,
                        kitchenName:itemData.item.kitchen_name,
                  }
                });
               }
            }/>
        )
    }


        return(
            <View style={styles.screen}>
             <View style={styles.mealsContainer}>   
          <FlatList data={favoriteMeals} renderItem={renderFoodItem} keyExtractor={(item)=>item.dish_id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<View style={styles.emptyView}><Text style={styles.emptyText}>No Favorites Found!! Add New</Text></View>}

          />
          </View>
        </View>
        )
    };


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
            
        },
        container:{
            flex:1,
            flexDirection:'column',
          
        },
        mealsContainer:{
           width:'100%',
          flex:1
        },
        emptyView:{
            flex:1,
            //height:'100%',
            justifyContent:'center',
            alignItems:'center',
            marginVertical:'50%',
        },
        emptyText:{
            fontSize:16,
            fontStyle:'normal',
            fontWeight:'500'
        }
    
       
    }
)

export default FavoritesScreen;
