import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import KitchenCard from "../components/kitchenCard1";
import IP from "../constants/IP";

import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";


const RestaurantsScreen=(props)=>{
    const [isLoading,setLoading]=useState(true);
    const [isnumDishesLoading,setNumDishesLoading]=useState(true);
    const [kitchensData,setkitchensData]=useState([]);
    const [kitchensRating,setKitchensRating]=useState([]);
    const [kitchensDishes,setKitchensDishes]=useState([]);
    let selectedRating;
    let currentRating;
    let numDishes;


    const kitchens=useSelector(state=>state.dish.kitchens);
    const ratings=useSelector(state=>state.dish.ratingsOfKitchens);
    const numOfDishes=useSelector(state=>state.dish.numOfDishes);
    

    // useEffect(()=>{
    //     fetch(`http://${IP.ip}:3000/kitchen`)
    //     .then((response)=>response.json())
    //     .then((response)=>setkitchensData(response))
    //     .catch((error)=>console.error(error))
        
    //   },[]);

    useEffect(()=>{
        setkitchensData(kitchens);
        setKitchensRating(ratings);
        setKitchensDishes(numOfDishes);
    },[])



    //   useEffect(()=>{
    //     fetch(`http://${IP.ip}:3000/order/ratingRecord/rating`)
    //     .then((response)=>response.json())
    //     .then(async(response)=>{setKitchensRating(response);
    //        await fetch(`http://${IP.ip}:3000/dish/dishes/numOfDishes`)
    //         .then((response)=>response.json())
    //         .then((response)=>setKitchensDishes(response)       
    //      )
    //     })
    //     .then(()=>console.log(kitchensRating))
    //     .then(()=>console.log(kitchensDishes))
    //     .catch((error)=>console.error(error))
    //     .finally(()=>setLoading(false));
    //   },[isLoading]);

    //   useEffect(()=>{
        
    //      )
    //     .then(()=>console.log(kitchensDishes))
    //     .catch((error)=>console.error(error))
    //     .finally(()=>setNumDishesLoading(false));
    //   },[isnumDishesLoading]);



      const renderKitchenCard=(itemData)=>{
        
        let ratingObject = kitchensRating.find(obj => obj.chef_id === itemData.item.chef_id);
        let dishesObj=kitchensDishes.find(obj => obj.kitchen_name === itemData.item.kitchen_name);
        console.log(ratingObject);
        if(ratingObject){
            let rating=Math.ceil(ratingObject.totalRating/ratingObject.deliveredOrders)
            console.log("////////////")
            console.log(itemData.item.chef_id);
            console.log(rating);
            currentRating=rating;
            selectedRating=rating;
        }
        else{
            currentRating=3;
        }
        if(dishesObj){
            numDishes=dishesObj.dishes;
        }
        else{
            numDishes=0;
        }
        
        return(
           <KitchenCard kitchenName={itemData.item.kitchen_name} kitchenLogo={itemData.item.logo} startTime={itemData.item.start_time}
            endTime={itemData.item.end_time}
            chefId={itemData.item.chef_id}
            rating={currentRating}
            dishes={numDishes}
            onSelect={()=>{
                props.navigation.navigate({
                    routeName:'RestaurantDetail',
                    params:{
                      kitchenName:itemData.item.kitchen_name,
                      kitchenLogo:itemData.item.logo,
                      startTime:itemData.item.start_time,
                      endTime:itemData.item.end_time,
                      dishes:numDishes,
                      rating:currentRating===selectedRating?currentRating:selectedRating


                    }
                });
               }
            }/>
        )
    }
    return(
       
        <View style={styles.container}>
            <View style={styles.kitchenContainer}>
            <FlatList data={kitchensData} renderItem={renderKitchenCard} keyExtractor={(item)=>item.kitchen_name}
            showsVerticalScrollIndicator={false}/>
            </View>
        </View>
        
        )
}
    

const styles=StyleSheet.create(
    {
    container:{
        flex:1,
        flexDirection:'column',
        height:'100%'
      
    },
    kitchenContainer:{
       width:'100%',
      
    }
       
    }
)

export default RestaurantsScreen;