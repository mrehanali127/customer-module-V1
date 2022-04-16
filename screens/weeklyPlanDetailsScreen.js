import React from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  FlatList,
  Pressable,
  Modal,
  Alert,
} from "react-native"
import { useState,useEffect } from "react"
//import DatePicker from 'react-native-date-picker'
import DatePicker from "@dietime/react-native-date-picker";

import WeeklyPlanCard from "../components/weeklyPlanCard"
import DayWiseFoodCard from "../components/DayWiseFoodCard"
import { DAYSDATA } from "../constants/daysData"
import IP from "../constants/IP"
import Colors from "../constants/Colors";
import { useSelector,useDispatch } from "react-redux";


const WeeklyPlanDetailsScreen = (props) => {
    const imageURL = props.navigation.getParam("imgurl")
    const planName = props.navigation.getParam("planName")
    const KitchenName = props.navigation.getParam("KitchenName")
    const price = props.navigation.getParam("price")
    const planId=props.navigation.getParam("planId")
    const allDishes=useSelector(state=>state.dish.Dishes);
    const customerData=useSelector(state=>state.dish.customerDetails);

    const [currentmodalVisible, setModalVisible] = useState(false)
    const [planDetails,setPlanDetails]=useState({});
    const [isLoading,setLoading]=useState(true);
    const [daysData,setDaysData]=useState([]);
    const [planDishes,setPlanDishes]=useState([]);
    const [date, setDate] = useState(new Date());
    const [chefId,setChefId]=useState('');
    let expired_date = new Date();

    let chef;
    let days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


    useEffect(()=>{
      let daysArr=[];
      fetch(`http://${IP.ip}:3000/weeklyPlan/getWeekDetails/${planId}`)
      .then((response)=>response.json())
      .then((response)=>setPlanDetails(response[0]))
      // .then(()=>dispatch(getDishes(mealsData)))
      // .then(()=>dispatch(getCategoricalData(mealsData)))

      .then(()=>console.log(planDetails))
      .then(()=>{
        //let daysArr=[];
        daysArr.push(planDetails["monday"]);
        daysArr.push(planDetails["tuesday"]);
        daysArr.push(planDetails["wednesday"]);
        daysArr.push(planDetails["thursday"]);
        daysArr.push(planDetails["friday"]);
        daysArr.push(planDetails["saturday"]);
        setDaysData(daysArr);
        console.log(daysData);

      })
      .then(()=>{
        //console.log(allDishes);
       let selectedDishes= allDishes.filter(dish => daysArr.includes(dish.dish_id))
       //console.log(allDishes.filter(dish => daysData.includes(dish.dish_id)))
      
       for(let i=0;i<selectedDishes.length;i++){
         selectedDishes[i]["day"]=days[i]
        
       }
       setPlanDishes(selectedDishes);
       console.log("///  Slected Dishes //")
       console.log(selectedDishes);
       //people.filter(person => id_filter.includes(person.id))
      // setCategoricalMeals(categories.filter(item=>filteredCuisines.includes(item.cuisine)));
      })
      .catch((error)=>console.error(error))
      .finally(()=>setLoading(false));
    },[isLoading]);
  
    function showItem(itemData) {
      return (
        <DayWiseFoodCard
          img_url={`http://${IP.ip}:3000/images/${itemData.item.image}`}
          //Day={itemData.item.Day}
          DishName={itemData.item.dish_name}
          price={itemData.item.price}
          Category={itemData.item.cat_name}
          Day={itemData.item.day}
          onSelect={() => {
            console.log("clicked")
           
          }}
        />
      )
    }


  const getChefId=async ()=>{
    await fetch(`http://${IP.ip}:3000/kitchen/${KitchenName}`)
    .then((response)=>response.json())
    .then((response)=>{
      setChefId(response[0].chef_id)
      chef=response[0].chef_id;
    })

    .then(()=>console.log(chefId))
    .catch((error)=>console.error(error))
  }

  
  const subscribeNewPlan=async ()=>{
    await getChefId().then(()=>{
      expired_date.setDate(date.getDate() + 7);
      console.log("////  Data for subscribing new Plan  ////")
      console.log(customerData.phone)
      console.log(chef);
      console.log(planId);
      console.log(date);
      console.log(expired_date);
    })
    .then(()=>{
      let url=`http://${IP.ip}:3000/weeklyPlan//subscribePlan`;
                let data={
                    customer:customerData.phone,
                    chef:chef,
                    planId:planId,
                    subDate:date,
                    expDate:expired_date
                    //totalAmount:subTotal
                }
                console.log(data);
                fetch(url,{
                    method:'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(data)
                })
                .then((response)=>response.json())
                .then(()=>{console.log("Plan Subscription Data added")})
                .catch((error)=>console.log(error));
    })
    
  }   

    return (
      <View style={styles.plancard}>
        <View>
          <WeeklyPlanCard
            imgurl={`http://${IP.ip}:3000/images/${imageURL}`}
            planname={planName}
            KitchenName={KitchenName}
            price={price}
         
          />
        </View>
  
        {/* <ScrollView> */}
      
          <View style={styles.plantable}>
            <FlatList
              style={styles.flatlist}
              //data={DAYSDATA}
              data={planDishes}
              renderItem={showItem}
              keyExtractor={(item) => item.dish_id}
            />
          <View style={{position: 'absolute', bottom: 5,left:0,right:0, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.btnsubscribe}
            onPress={() => {
              setModalVisible(true)
            }}>
            <View>
              <Text style={styles.btntext}>Subscribe</Text>
            </View>
          </TouchableOpacity>
        </View>
         
        </View>
        {/* </ScrollView> */}
        <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={currentmodalVisible}
            onRequestClose={() => {
              setModalVisible(false)
            }}>
            <View style={styles.subscribepopup}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Subscribe Weekly Plan!</Text>
                <Text style={styles.planText}>Weekly Plan:</Text>
                <Text style={{color:Colors.lightBlack}}>{planName}</Text>
                <Text style={styles.planText}>Kitchen Name:</Text>
                <Text style={{color:Colors.lightBlack}}>{KitchenName}</Text>
                <Text style={styles.planText}>Total:</Text>
                <Text style={{color:Colors.lightBlack}}>Rs. {price}</Text>
                <Text style={styles.planText}>Subscription Date:</Text>
                {/* <DatePicker mode="date" date={date} onDateChange={setDate} /> */}
                <View>
                  <Text>{date ? date.toDateString() : "Select date..."}</Text>
                  <DatePicker
                      height={70}
                      fontSize={14}
                      value={date}
                      onChange={(value) => setDate(value)}
                  />
              </View>
                <Text style={styles.planText}>
                  Kindly Confirm or Cancel the Weekly Plan!
                </Text>
                <View style={styles.modalbtn}>
                  <Pressable
                    style={[styles.button, styles.btnConfirmCancel]}
                    onPress={() => {
                      Alert.alert("Your Weekly Plan has been Cancelled!")
                      setModalVisible(false)
                    }}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.btnConfirmCancel]}
                    onPress={() => {
                      subscribeNewPlan().then(()=>{
                        Alert.alert(
                          "Your Weekly Plan has been Subscribed Successfully!"
                        )
                        setModalVisible(false);
                        props.navigation.navigate("Home");
                      })
                     
                    }}>
                    <Text style={styles.textStyle}>Confirm</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    plancard: {
      flex: 1,
     
    },
    plantable: {
      backgroundColor: "#ff620a",
      width: "95%",
      elevation: 5,
      marginTop: 15,
      flex:1,
      marginHorizontal: 10,
      borderRadius: 15,
      margin: 15,
      paddingVertical: 15,
    },
    flatlist: {
      width: "100%",
    
      
    },
    btnsubscribe: {
      backgroundColor: "#ffab00",
      position: "absolute",
      bottom: 3,
      height: 45,
      width: 170,
      alignItems: "center",
      borderRadius: 40,
      justifyContent: "center",
    },
    btntext: {
      fontWeight: "bold",
      fontSize: 18,
      color: "white",
    },
    subscribepopup: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: "#000a",
    },
    modalView: {
      height: 430,
      width: "75%",
      elevation: 5,
      margin: 20,
      backgroundColor: "#f5fcff",
      borderRadius: 10,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
    },
  
    btnConfirmCancel: {
      backgroundColor: "#ff620a",
      width: 100,
      height: 40,
      borderRadius: 30,
      justifyContent: "center",
      marginBottom: 10,
      elevation: 5,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 18,
    },
    modalText: {
      margin: 15,
      textAlign: "center",
      color: "#ff620a",
      fontWeight: "bold",
      fontSize: 18,
    },
    planText: {
      color: "black",
      fontSize: 16,
      fontWeight: "bold",
    },
    modalbtn: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginTop: 30,
      // paddingLeft: 20,
      // paddingRight: 20,
    },
  })
  
  export default WeeklyPlanDetailsScreen