import React,{useEffect,useState,useCallback} from "react";
import axios from "axios";
import { ScrollView, View,Text,StyleSheet, Button,Image,ImageBackground,Dimensions,ToastAndroid,TouchableOpacity} from "react-native";
import Colors from "../constants/Colors";
import { MaterialIcons } from '@expo/vector-icons';
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from '../components/customHeaderButton';
import KitchenCard from "../components/kitchenCard1";
import CustomButton from "../components/customButton";
import { useSelector,useDispatch } from "react-redux";
import { toggleFavorite,addCartItem,addItemToCartTable } from "../store/actions/dishActions";
import IP from "../constants/IP";

const FoodItemDetailsScreen=(props)=>{

      const[isLoading,setLoading]=useState(true);
      const[kitchens,setKitchens]=useState([]);
      const dispatch=useDispatch();

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
      //const mealsData=props.navigation.getParam('mealData');
      const mealsData=useSelector(state=>state.dish.Dishes);
      const itemsPlacedInCart=useSelector(state=>state.dish.cartItems);

      
      const selectedMeal=mealsData.filter(food=>food.dish_id===mealId);
      const isDishFavorite=useSelector(state=>state.dish.favoritesIds.some(dish=>dish.dish_id===mealId))
      
      const addNewFavorite=()=>{
        let url=`http://${IP.ip}:3000/dish/favorites`;
        let data={
            customerId:'03082562292',
            dishId:selectedMeal[0].dish_id,
        }
        fetch(url,{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>ToastAndroid.show(`${selectedMeal[0].dish_name} Added to Favorites`, ToastAndroid.SHORT))
        .catch((error)=>console.log(error));
      }

      const removeFromFavorite=()=>{
      let url=`http://${IP.ip}:3000/dish/removeFavorite`;
      let data={
          dishId:selectedMeal[0].dish_id
      }
      fetch(url,{
          method:'DELETE',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          body:JSON.stringify(data)
      }).then((response)=>response.json())
      .then((response)=>console.log(response))
      .then(()=>console.log("Item Removed From Favorite"))
      }

      const addItemToCart=()=>{

        const openedItem=itemsPlacedInCart.find(item=>item.dish_id===selectedMeal[0].dish_id);
        const index=itemsPlacedInCart.indexOf(openedItem);
        if(index>=0){
            ToastAndroid.show(`${selectedMeal[0].dish_name} Already In Cart`, ToastAndroid.SHORT)
        return;
        }


        let url=`http://${IP.ip}:3000/cart`;
        let insertedId;
        let data={
            customerId:'03082562292',
            dishId:selectedMeal[0].dish_id,
            quantity:1,
            totalAmount:selectedMeal[0].price*1
        }
        fetch(url,{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then((response)=>{
            insertedId=response.insertId;
            const cartItem={
                cart_item_id:insertedId,
                cust_id:'03082562292',
                dish_id:selectedMeal[0].dish_id,
                quantity:1,
                total_amount:selectedMeal[0].price
            }
            dispatch(addItemToCartTable(cartItem));
            })
        .then(()=>ToastAndroid.show(`${selectedMeal[0].dish_name} Added to Cart`, ToastAndroid.SHORT))
        .then(()=>dispatch(addCartItem(selectedMeal[0].dish_id)))
        .catch((error)=>console.log(error));

    }

    const handleToggleFavorite=()=>{
        dispatch(toggleFavorite(mealId));
        if(isDishFavorite){
            removeFromFavorite();
        }
        else{
            addNewFavorite();
        }
       
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
            <TouchableOpacity onPress={handleToggleFavorite}>
            <MaterialIcons name={isDishFavorite ? "favorite" :"favorite-outline"} size={28} color={Colors.primaryColor} />
            </TouchableOpacity>
            </View>
            <Text style={styles.price}>Rs.{selectedMeal[0].price}</Text>
            <Text style={styles.category}>Cuisine: {selectedMeal[0].cuisine}</Text>
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
