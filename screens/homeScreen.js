import React from "react";
import { View,Text,StyleSheet, Button, FlatList,TouchableOpacity,Modal} from "react-native";
import Colors from '../constants/Colors';;
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/customHeaderButton";
import SearchBarHeader from "../components/headerSearchBar";
import { cuisines } from "../constants/cuisines";
import FoodItem from "../components/foodItem";
import IP from "../constants/IP";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import CuisineTile from "../components/cuisineTile";
import { getDishes,getCategoricalData } from "../store/actions/dishActions";
import FilterModal from "../components/filterModal";


const HomeScreen=(props)=>{

    const [isLoading,setLoading]=useState(true);
    const [mealsData,setmealsData]=useState([]);
    const [showModal,setShowModal]=useState(false);
    const [categoricalMeals,setCategoricalMeals]=useState([]);
    const [selectedCuisine,setSelectedCuisine]=useState('');
    const [selectedCuisines,setSelectedCuisines]=useState([]);
    //const mealsData=useSelector(state=>state.dish.Dishes);

    //const [dishes,setDishes]=useState([]);
    const dispatch=useDispatch();
    const meals=useSelector(state=>state.dish.Dishes);
    const categories=useSelector(state=>state.dish.categoricalDishes);
    
    const searchingFood=useSelector(state=>state.dish.searchInput);
    

    useEffect(()=>{
        setCategoricalMeals(categories);
    },[categories,searchingFood])
    
    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/dish`)
        .then((response)=>response.json())
        .then((response)=>setmealsData(response))
        .then(()=>dispatch(getDishes(mealsData)))
        .then(()=>dispatch(getCategoricalData(mealsData)))
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false));
      },[isLoading]);
    
    
    
    console.log("#########################################################")
    console.log(meals);


      const renderFoodItem=(itemData)=>{
        return(
           <FoodItem title={itemData.item.dish_name} imageUrl={itemData.item.image} kitchenName={itemData.item.kitchen_name}
            price={itemData.item.price}
            onSelect={()=>{
                
                props.navigation.navigate({
                    routeName:'FoodDetail',
                    params:{
                        mealId:itemData.item.dish_id,
                        kitchenName:itemData.item.kitchen_name,
                        mealData:meals


                    }
                });
               }
            }/>
        )
    }


    const renderCuisine=(itemData)=>{
        return(
            <CuisineTile cuisine={itemData.item} 
            width={90} margin={5}
            selected={selectedCuisines} onSelect={()=>{
                setSelectedCuisine(itemData.item)
                setSelectedCuisines({selectedCuisines:[selectedCuisines,itemData.item]})
                //setSelectedCuisine(itemData.item)
                //const filteredCategory=meals.filter(dish=>dish.cuisine===itemData.item);
                //dispatch(getCategoricalData(filteredCategory));    
            }}/>
        )
    }

    /*
    const renderModal=()=>{
        return(
            <View>
            <FilterModal showModal={true}/>
            </View>
        )
    }*/


        return(
       
        <View style={styles.container}>
        <View style={styles.header}>
        <SearchBarHeader onSelect={()=>{
            props.navigation.navigate({
                routeName:'Notifications',
            
            });
        }}
        
        onSearch={()=>{
            const reg=new RegExp(searchingFood, "i");
            setCategoricalMeals(categories.filter(dish=>reg.test(dish.dish_name)));
           
           console.log("////////////////   Seatch  ///////////////////")
           console.log(categoricalMeals);
        }}

        />
        
          </View>
          <View style={styles.mealsContainer}>
          
          <FlatList data={categoricalMeals} renderItem={renderFoodItem} keyExtractor={(item)=>item.dish_id}
          showsVerticalScrollIndicator={false}
          />
          <View style={{position: 'absolute', bottom: 5,left:0,right:0, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={()=>{setShowModal(true)}}>
            <View style={styles.filterContainer}>
            <Ionicons name="filter" size={24} color={Colors.whiteColor} />
            <Text style={{color:Colors.whiteColor,fontSize:16,fontWeight:'bold'}}>Filter</Text>
            </View>
            </TouchableOpacity>
            </View>
          
          </View>

          <Modal
                transparent={true}
                //visible={props.showModal}
                visible={showModal}
                >
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                    <View style={{backgroundColor:'#fff',marginTop:350,marginHorizontal:30,borderRadius:10,padding:10}}>
                    <View style={styles.filterHeader}>
                    <Text style={styles.filterheaderText}>Cuisines</Text>
                    </View>
                    <FlatList data={cuisines} renderItem={renderCuisine} 
                    numColumns={3}
                    keyExtractor={(item)=>item}
                        showsVerticalScrollIndicator={false}
                    />
                 
                <View style={{...styles.btnContainer,justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=>{
                    setShowModal(false);
                    }}>       
                <View style={{...styles.buttonContainer,backgroundColor:Colors.primaryLightColor}}>
                    <Text style={styles.btnTitle}>Cancel</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                  
                    setShowModal(false);
                    }}>
                <View style={{...styles.buttonContainer}}>
                    <Text style={styles.btnTitle}>Apply</Text>
                </View>
                </TouchableOpacity>
                </View>

                </View>
                </View>
            </Modal>

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
       width:'100%',
      flex:1
    },
    filterContainer:{
        flex:1,
        flexDirection:'row',
        backgroundColor:Colors.primaryColor,
        paddingHorizontal:20,
        paddingVertical:5,
        borderRadius:15,
        elevation:5,

    },
    buttonContainer:{
        backgroundColor:Colors.primaryColor,
        justifyContent:'center',
        alignItems:'center',
        padding:3,
        width:100,
        marginHorizontal:5,
        marginBottom:5,
        borderRadius:10
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginTop:10
        
    },
    btnTitle:{
        color:Colors.whiteColor,
        fontSize:16,
    },
    filterheaderText:{
        fontSize:16,
        fontWeight:'bold',
        color:Colors.primaryColor
    }

}
)

export default HomeScreen;