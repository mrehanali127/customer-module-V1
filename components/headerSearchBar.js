import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import React,{useState,useEffect} from "react";
import { Categories } from "../constants/categories";
import CategoryTile from "./categoryTile";
import { useSelector,useDispatch } from "react-redux";
import { applyCategory,getCategoricalData,searchInput } from "../store/actions/dishActions";
import { View,StyleSheet,Text,TextInput,Dimensions, ScrollView,FlatList,TouchableOpacity } from "react-native";
import { color } from "react-native-reanimated";


const SearchBarHeader=props=>{
    const [value,setValue]=useState("");
    const [catColor,setCatColor]=useState("#fff");
    const [selectedItem,setSelectedItem]=useState("All");
    const [Style,setStyle]=useState({});
    const dispatch=useDispatch();

    const Meals=useSelector(state=>state.dish.Dishes);

    useEffect(()=>{
        dispatch(searchInput(value));
       
    },[dispatch,value])
    

    const renderCatItem=(itemData)=>{
        
        return(
            <CategoryTile category={itemData.item} selected={selectedItem} onSelect={()=>{
                if(itemData.item==='All'){ 
                    setSelectedItem('All');
                    dispatch(getCategoricalData(Meals));   
                }
                else{
                setSelectedItem(itemData.item)
                const filteredCategory=Meals.filter(dish=>dish.cat_name===itemData.item);
                dispatch(getCategoricalData(filteredCategory));
                }
                
            }}/>
         )
    }

    return(
        <View style={styles.header}>
            <View style={styles.searchContainer}>
                <View style={styles.searchButton}>
                <TextInput style={styles.input} value={value} onChangeText={(text)=>setValue(text)} placeholder="Search Food"
                 />
                <TouchableOpacity onPress={props.onSearch}>
                <Ionicons name="search" size={24} color="white"/>
                </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={props.onSelect}>
                <Ionicons name="ios-notifications" size={24} color="white"/>
                </TouchableOpacity>
            </View>
            <View style={styles.categoriesScroll}>
               
                <FlatList horizontal data={Categories} renderItem={renderCatItem} keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}/>
            </View>
        </View>
    )

}

const styles=StyleSheet.create({

    header:{
        flex:1,
        
    },
    searchContainer:{
        padding:5,
        paddingTop:40,
        flexDirection:'row',
        justifyContent:'space-around',
        elevation:5,
        backgroundColor:Colors.primaryColor,
    
      
    },
    searchButton:{
        width:'70%',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    input:{
        width:'85%',
        backgroundColor:'#e6e6e6',
        borderRadius:10,
        paddingHorizontal:10,
        
    },
    categoriesScroll:{
        height:50,
        backgroundColor:Colors.primaryColor
    }
})

export default SearchBarHeader;