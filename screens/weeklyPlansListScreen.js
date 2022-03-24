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
} from "react-native"
import WeeklyPlanCard from "../components/weeklyPlanCard"
import { PLANSDATA } from "../constants/plansData"

const WeeklyPlansListScreen = (props) => {
  function showItem(itemData) {
    return (
      <WeeklyPlanCard
        imgurl={itemData.item.img_url}
        planname={itemData.item.PlanName}
        KitchenName={itemData.item.KitchenName}
        price={itemData.item.price}
        onSelect={() => {
          console.log("clicked")
          props.navigation.navigate({
            routeName: "WeeklyPlanDetails",
            params: {
              imgurl: itemData.item.img_url,
              planname: itemData.item.PlanName,
              KitchenName: itemData.item.KitchenName,
              price: itemData.item.price,
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
        data={PLANSDATA}
        renderItem={showItem}
        keyExtractor={(item) => item.PlanName}
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
