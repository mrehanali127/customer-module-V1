import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';;
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import FoodItem from "../components/foodItem";
import KitchenCard from "../components/kitchenCard1";
import IP from "../constants/IP";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const RestaurantDetailScreen=(props)=>{

        const[isLoading,setLoading]=useState(true);
        //const[dishes,setDishes]=useState([]);
        const[specialDishes,setSpecialDishes]=useState([]);

        const kitchenName=props.navigation.getParam('kitchenName');
        const allDishes=useSelector(state=>state.dish.Dishes);
        const allChefs=useSelector(state=>state.dish.chefs);
        const allKitchens=useSelector(state=>state.dish.kitchens);
        const ratings=useSelector(state=>state.dish.ratingsOfKitchens);
        const dishes=allDishes.filter(dish=>dish.kitchen_name===kitchenName);
       
        const selectedKitchen=allKitchens.filter(kitchen=>kitchen.kitchen_name===kitchenName);

        const selectedChef=allChefs.filter(chef=>chef.chef_id===selectedKitchen[0].chef_id);
        const selectedChefId=selectedKitchen[0].chef_id;
       
        const selectedRating=ratings.filter(rating=>rating.chef_id===selectedChef[0].chef_id);
        const selectedRatingObj=selectedRating[0];

        let currentRating;

        if(selectedRatingObj){
            let rating=Math.ceil(selectedRatingObj.totalRating/selectedRatingObj.deliveredOrders)
            console.log(rating);
            currentRating=rating;
        }
        else{
            currentRating=3;
        }

      
        useEffect(()=>{
        fetch(`http://${IP.ip}:3000/kitchen/specialDishes/${selectedChefId}`)
        .then((response)=>response.json())
        .then((response)=>setSpecialDishes(response))
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false));
        },[isLoading]);

        console.log("// Special Dishes //");
        console.log(specialDishes);
        //const specialDishesData=allDishes.filter(dish=>dish.dish_id===specialDishes.);
        // const specialDishesData = allDishes.filter(all => 
        //     specialDishes.every(special => special.dish_id === all.dish_id));
        const specialDishesData = allDishes.filter( all => {
            return specialDishes.some( filtered => {
              return filtered.dish_id === all.dish_id;
            });
          });
        

        const specialDishesNames = specialDishesData.map((item)=>item.dish_name);
        console.log("// Specail Dishes Names //")
        console.log(specialDishesNames);


        //const kitchenName=props.navigation.getParam('kitchenName');
        const kitchenLogo=props.navigation.getParam('kitchenLogo');
        const startTime=props.navigation.getParam('startTime');
        const endTime=props.navigation.getParam('endTime');
        //const rating=props.navigation.getParam('rating');
        const numDishes=props.navigation.getParam('dishes');
        //console.log("///// Rating ////");
        //console.log(rating);


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
                            mealData:dishes
                        }
                    });
                   }
                }/>
            )
        }

    
        return(
            <View style={styles.container}>
                <View style={styles.kitchenContainer}>
              <KitchenCard kitchenName={kitchenName} kitchenLogo={kitchenLogo} startTime={startTime}
              rating={currentRating}
              dishes={dishes.length}
              special1={specialDishesNames[0]}
              special2={specialDishesNames[1]}
              address={selectedChef[0].address}
              locality={selectedChef[0].locality}
            endTime={endTime}/>
            </View>
            {dishes.length>0 &&
            <FlatList data={dishes} renderItem={renderFoodItem} keyExtractor={(item)=>item.dish_id}
            showsVerticalScrollIndicator={false}/>
            }
            </View>
        )
    };


const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            flexDirection:'column',
            height:'100%'
          
        },
        kitchenContainer:{
           width:'100%',
           height:250,
           backgroundColor:Colors.primaryColor,
           paddingVertical:5
          
        }
       
    }
)

export default RestaurantDetailScreen;
