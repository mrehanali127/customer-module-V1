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
import { useSelector } from "react-redux";
import IP from "../constants/IP";
import { PLANSDATA } from "../constants/plansData";

const MyPlanScreen = (props) => {

  const [weeklyPlansList,setWeeklyPlansList]=useState([]);
  const [isLoading,setLoading]=useState(true);

  const customerDetail=useSelector(state=>state.dish.customerDetails);



  useEffect(()=>{
    fetch(`http://${IP.ip}:3000/weeklyPlan/cusomerPlan/${customerDetail.phone}`)
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
        subscribedDate={itemData.item.subscribed_date}
        expiredDate={itemData.item.expired_date}
        showButton={false}
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
              showButton:false,
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
        keyExtractor={(item) => item.subscription_id}
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

export default MyPlanScreen;
