import React,{useEffect,useState,useCallback} from "react";
import axios from "axios";
import { ScrollView, View,Text,StyleSheet, Button,Image,ImageBackground,Dimensions} from "react-native";
import Colors from "../constants/Colors";
import { MaterialIcons } from '@expo/vector-icons';
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from '../components/customHeaderButton';
import KitchenCard from "../components/kitchenCard1";
import CustomButton from "../components/customButton";
import IP from "../constants/IP";

const FoodItemDetailsScreen=(props)=>{

      const[isLoading,setLoading]=useState(true);
      const[kitchens,setKitchens]=useState([]);

      useEffect(()=>{
        const kitchenName=props.navigation.getParam('kitchenName');
        fetch(`http://${IP.ip}:3000/kitchen/${kitchenName}`)
        .then((response)=>response.json())
        .then((response)=>setKitchens(response))
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false));
      },[]);

      //console.log(kitchens);

      const mealId=props.navigation.getParam('mealId');
      const mealsData=props.navigation.getParam('mealData');
      const kitchenName=props.navigation.getParam('kitchenName');
      //console.log(kitchenName);
      const selectedMeal=mealsData.filter(food=>food.dish_id===mealId);
      //const selectedKitchen=kitchens.filter(kitchen=>kitchen.kitchen_name===kitchenName);
      //console.log(selectedKitchen);

      const addItemToCart=()=>{
        let url=`http://${IP.ip}:3000/cart`;
        let data={
            customerId:'03082562292',
            dishId:selectedMeal[0].dish_id,
            quantity:1,
            kitchenName:selectedMeal[0].kitchen_name,
            totalAmount:selectedMeal[0].price

        }
        fetch(url,{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>console.log("DATA Inserted"))
        .catch((error)=>console.log(error));

    }



    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View>
        <View style={styles.foodItem}>
         <View style={{...styles.foodRow,...styles.foodHeader}}>
                <ImageBackground source={{uri:selectedMeal[0].image}} style={styles.backgroundImage}>
            <View style={styles.titleContainer}>
            <Text style={styles.Item} numberOfLines={1}>
              {selectedMeal[0].dish_name}
            </Text>
            </View>
            </ImageBackground>
        </View>
        <View style={styles.details}>
            <View style={styles.kitchenNameHeader}>
            <Text style={styles.kitchenName}>{selectedMeal[0].kitchen_name}</Text>
            <MaterialIcons name="favorite-outline" size={28} color={Colors.primaryColor} />
            </View>
            <Text style={styles.price}>Rs.{selectedMeal[0].price}</Text>
            <Text style={styles.category}>Category: {selectedMeal[0].cat_name}</Text>
        </View>
        <View style={styles.descButton}>
        <Text style={styles.title}>Description</Text>
        <CustomButton color={Colors.primaryColor} onSelect={addItemToCart} title="ADD TO CART"/>
        </View>
        <View>
       <Text style={styles.description}>
           {selectedMeal[0].description}
       </Text>
        </View>
        </View>
        </View>
        {kitchens.length>0 &&
        <KitchenCard kitchenName={kitchens[0].kitchen_name} kitchenLogo={kitchens[0].logo}
        startTime={kitchens[0].start_time} endTime={kitchens[0].end_time} 
        onSelect={()=>{           
            props.navigation.navigate({
                routeName:'RestaurantDetail',
                params:{
                    kitchenName:kitchens[0].kitchen_name,
                    kitchenLogo:kitchens[0].logo,
                    startTime:kitchens[0].start_time,
                    endTime:kitchens[0].end_time
                }
            });
           }
        }
        />
        }
    </ScrollView>
 )
};




const styles=StyleSheet.create(
 {
    image:{
         width:'100%',
         height:300
    },
    details:{
        paddingHorizontal:20, 
        paddingVertical:10,
        justifyContent:'space-around'

    },
    title:{
         fontSize:20,
         marginHorizontal:20
    },
    listItem:{
        marginVertical:5,
        marginHorizontal:20,
        borderColor:'#ccc',
        borderWidth:1,
        padding:10
    },
    kitchenNameHeader:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    description:{
        width:'80%',
        marginHorizontal:20,
        color:Colors.lightBlack,
        justifyContent:'center',
      
       
    },
    foodRow:{
        flexDirection:'row',
        justifyContent:'center'

    },
    foodItem:{
         height:Dimensions.get('window').height*0.6,
         width:'100%',
         backgroundColor:'#f5f5f5',
         overflow:'hidden',
       
    },
    foodHeader:{
        height:'50%'
    },
    foodDetail:{
        height:'50%',
        paddingHorizontal:20,
    },
    backgroundImage:{
        width:'100%',
        height:'100%',
        justifyContent:'flex-end'
    },
    titleContainer:{
        backgroundColor:'rgba(0,0,0,0.5)',
        paddingVertical:5,
        paddingHorizontal:10,
    },
    descButton:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },

    Item:{
        fontSize:22,
        color:'white',
        textAlign:'center'
    },
    kitchenName:{
        fontSize:22,
        color:Colors.lightBlack
    },
    price:{
        fontSize:18,
        color:Colors.primaryColor
    },
    category:{
        fontSize:16,
        color:Colors.lightBlack
    }
 }
    )



export default FoodItemDetailsScreen;
