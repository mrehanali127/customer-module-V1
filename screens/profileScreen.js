import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
 ToastAndroid,
  
 
} from "react-native"
import OrdersCard from "../components/ordersCard"
import { Ionicons } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import { useSelector,useDispatch } from "react-redux"
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { getCustomerDetail } from "../store/actions/dishActions"
import Colors from "../constants/Colors"
import IP from "../constants/IP"
const ProfileScreen = (props) => {
  
  
  //States & Selectors
  const customerDetail=useSelector(state=>state.dish.customerDetails);
  const [firstName, setFirstName] = useState(customerDetail.firstname)
  const [lastName,setLastName]=useState(customerDetail.lastname);
  const [phone,setPhone]=useState(customerDetail.phone);
  const [city,setCity]=useState(customerDetail.city);
  const [address,setAddress]=useState(customerDetail.address);

  const dispatch=useDispatch();
  

  const fnameInputHandler = (enteredText) => {
    setFirstName(enteredText)
  }
  /************************************/

  //Customer Last name handlers
  
  const lnameInputHandler = (enteredText) => {
    setLastName(enteredText)
  }
  /************************************/

  //Customer Phone handlers
  
  const phoneInputHandler = (enteredText) => {
    setPhone(enteredText)
  }
  /************************************/

  //Address handlers
  
  const addressInputHandler = (enteredText) => {
    setAddress(enteredText)
  }
  /************************************/

  //City picker
  
  const saveChangesHandler = () => {
   
    let url=`http://${IP.ip}:3000/customer/updateProfile/${phone}`;
      let data={
          firstname:firstName,
          lastname:lastName,
          city:city,
          address:address,
          phone:phone
      }
      fetch(url,{
          method:'PUT',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          body:JSON.stringify(data)
      }).then((response)=>response.json())
      .then(()=>dispatch(getCustomerDetail(data)))
      .then(()=>ToastAndroid.show(`Profile has bee updated`, ToastAndroid.SHORT))
      .catch((error)=>console.error(error))   
    
  }
  return (
    <View style={styles.screencontainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{width:'100%',alignItems:'center',paddingVertical:15}}>
      <Text style={styles.nameHeader}>Hello! {customerDetail.firstname} {customerDetail.lastname}</Text>
      </View>

      <View style={styles.cardView}>
      <View style={styles.buttonsContainer}>
      <TouchableOpacity onPress={()=>props.navigation.navigate("MyOrders")}>
      <View style={styles.numberContainer}>    
          <Text style={styles.category}>My Orders</Text> 
          <Fontisto name="shopping-bag-1" size={22} color={Colors.primaryColor} />     
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>props.navigation.navigate("MyPlan")}>
      <View style={styles.numberContainer}>
           <Text style={styles.category}>My Plans</Text> 
          <FontAwesome5 name="calendar-week" size={22} color={Colors.primaryColor} />
      </View>
      </TouchableOpacity>
      </View>
      {/* <OrdersCard box1="Placed Orders" box2="Your Plans" myOrders={0} myPlans={0} 
       onOrders={()=>props.navigation.navigate("MyOrders")}
      /> */}

        {/* Fist name view */}
        <Text style={styles.fieldsname}>First Name</Text>
        <View style={styles.inputbox}>
          <TextInput
            style={styles.input}
            placeholder="Kitchen Name"
            onChangeText={fnameInputHandler}
            value={firstName}
          />
        </View>

        {/*Last name view */}
        <Text style={styles.fieldsname}>Last Name</Text>
        <View style={styles.inputbox}>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            onChangeText={lnameInputHandler}
            value={lastName}
          />
        </View>

        {/*Phone name view */}
        <Text style={styles.fieldsname}>Phone</Text>
        <View style={styles.inputbox}>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            onChangeText={phoneInputHandler}
            editable={false}
            value={phone}
          />
        </View>

        {/* city picker */}
        <Text style={styles.fieldsname}>City</Text>
        <Picker
          style={styles.picker}
          selectedValue={city}
          onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
          <Picker.Item label="Select City" value="diabled" color="#aaa" />
          <Picker.Item label="Mianwali" value="Mianwali" />
         
        </Picker>

        {/*address view */}
        <Text style={styles.fieldsname}>Address</Text>
        <View style={styles.inputbox}>
          <TextInput
            style={styles.input}
            placeholder="Enter your address here"
            multiline={true}
            numberOfLines={3}
            onChangeText={addressInputHandler}
            value={address}
          />
        </View>

       

        <View style={styles.btnview}>
          <TouchableOpacity
            style={styles.buttons}
            // onPress={() => console.log("Kitchen Hours")}
            onPress={saveChangesHandler}>
            <View>
              <Text style={styles.btntext}>Save Changes</Text>
            </View>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screencontainer: {
   
    //alignItems:'center',
    paddingHorizontal:30,
    width:'100%',
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  nameHeader:{
    color:Colors.primaryColor,
    fontSize:20,
    fontWeight:'bold',
    
    
  },
  cardView:{

    paddingHorizontal:15,
    paddingVertical:10,
    backgroundColor:Colors.whiteColor,
    borderRadius:20,
    elevation:1,
    


  },
  buttonsContainer:{
    width:'100%',
    height:50,
    justifyContent:'space-around',
    flexDirection:'row'
  },
  fieldsname: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  input: {
    flex: 1,
    // width: 150,
    textAlign: "left",
    // backgroundColor: "#aaa",
    color: "#aaa",

    color: "black",
  },
  inputbox: {
    borderColor: "#aaa",
    backgroundColor: "#f5fcff",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 35,
    marginTop: 5,
    width: "100%",
  },
  picker: {
    marginTop: 10,
    height: 55,
    width: "95%",
    justifyContent: "space-between",
    margin: 10,
  },

  btnview: {
    paddingTop: 35,
    flex: 1,
    alignItems: "center",
  },
  buttons: {
    backgroundColor: "#ff620a",
    width: "80%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,

    // elevation: 30,
  },
  btntext: {
    color: "white",
    fontSize: 16,
  },
  numberContainer:{

    width:120,
    height:40,
    borderRadius:10,
    shadowColor:Colors.lightBlack,
    flexDirection:'row',
    //shadowOpacity:0.16,
    //shadowOffset:{width:0,height:2},
    //shadowRadius:10, 
   // elevation:1,
   borderWidth:1,
   borderColor:Colors.primaryColor,
   paddingVertical:5,
   marginTop:10,
   paddingHorizontal:5,
  justifyContent:'center',
  alignItems:'center'
},
category:{
  fontSize:16,
  color:Colors.primaryColor,
  textAlign:'center',
  marginHorizontal:5
} 
})
export default ProfileScreen