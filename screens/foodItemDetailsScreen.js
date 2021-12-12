import React,{useEffect,useState,useCallback} from "react";
import { ScrollView, View,Text,StyleSheet, Button,Image,ImageBackground,Dimensions} from "react-native";
import Colors from "../constants/Colors";
import { MaterialIcons } from '@expo/vector-icons';
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from '../components/customHeaderButton';
import KitchenCard from "../components/kitchenCard1";
import IP from "../constants/IP";

const FoodItemDetailsScreen=(props)=>{

    const mealId=props.navigation.getParam('mealId');
    const mealsData=props.navigation.getParam('mealData');
    const kitchenName=props.navigation.getParam('kitchenName');
    console.log(kitchenName);
    const selectedMeal=mealsData.filter(food=>food.dish_id===mealId);

    const [isLoading,setLoading]=useState(true);
    const [kitchen,setKitchen]=useState([]);

    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/kitchen/${kitchenName}`)
        .then((response)=>response.json())
        .then((response)=>setKitchen(response))
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false));
      },[]);
    
    
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
        <Text style={styles.title}>Description</Text>
        <View>
       <Text style={styles.description}>
           {selectedMeal[0].description}
       </Text>
        </View>
        </View>
        </View>
        <KitchenCard kitchenName={selectedMeal[0].kitchen_name}/>
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
