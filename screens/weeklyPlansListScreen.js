import React from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native"
import WeeklyPlanCard from "../components/weeklyPlanCard"
import {useEffect,useState} from "react";
import IP from "../constants/IP";
import { PLANSDATA } from "../constants/plansData";

const WeeklyPlansListScreen = (props) => {

  const [weeklyPlansList,setWeeklyPlansList]=useState([]);
  const [isLoading,setLoading]=useState(true);


  useEffect(()=>{
    fetch(`http://${IP.ip}:3000/weeklyPlan`)
    .then((response)=>response.json())
    .then((response)=>setWeeklyPlansList(response))
    // .then(()=>dispatch(getDishes(mealsData)))
    // .then(()=>dispatch(getCategoricalData(mealsData)))
    .catch((error)=>console.error(error))
    .finally(()=>setLoading(false));
  },[isLoading]);



  function showItem(itemData) {
    return (
      <WeeklyPlanCard
        imgurl={`http://${IP.ip}:3000/images/${itemData.item.logo}`}
        planname={itemData.item.plan_name}
        KitchenName={itemData.item.kitchen_name}
        price={itemData.item.total}
        // showButton={true}
        onSelect={() => {
          console.log("clicked")
         
          props.navigation.navigate({
            routeName: "WeeklyPlanDetails",
            params: {
              imgurl: itemData.item.logo,
              planName: itemData.item.plan_name,
              planId:itemData.item.plan_id,
              KitchenName: itemData.item.kitchen_name,
              price: itemData.item.total,
              token:itemData.item.push_token,
              showButton:true,
            },
          })
        }}
      />
    )
  }
  return (
    <View style={styles.planscreen}>
      <FlatList
        style={styles.flatlist}
        //data={PLANSDATA}
        data={weeklyPlansList}
        renderItem={showItem}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={()=>{setLoading(true)}}/>}
        keyExtractor={(item) => item.plan_id}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  planscreen: {
    paddingTop: 10,
    flex: 1,
  },
  flatlist: {
    width: "100%",
  },
})

export default WeeklyPlansListScreen
