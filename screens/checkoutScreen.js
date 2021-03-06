import React from "react";
import { View,Text,StyleSheet, Button,Alert,TouchableOpacity,ScrollView,ToastAndroid } from "react-native";
import Colors from '../constants/Colors';
import AmountCard from "../components/amountCard";
import AddressCard from "../components/deliveryAddress";
import IP from "../constants/IP";
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { emptyTheCart,getCartData,emptyTheCartTable } from "../store/actions/dishActions";
import * as Notifications from 'expo-notifications';


const CheckoutScreen=(props)=>{

    const subTotal=props.navigation.getParam('subTotal');
    const deliveryCharges=props.navigation.getParam('deliveryCharges');
    const grandTotal=props.navigation.getParam('grandTotal');
    const allDishIds=props.navigation.getParam('dishIds');
    const tokens=props.navigation.getParam('tokens');
    const [addressDetails,setAddressDetails]=useState([]);
    const [cartTable,setCartTable]=useState([]);
    const [isLoading,setLoading]=useState(true);
    const [senderToken,setSenderToken]=useState('');
    const [isRefreshing,setRefreshing]=useState(true);
    const [chefLoading,setChefLoading]=useState(true);
    const [chefId,setChefId]=useState('');
    let notificationData;
    const dispatch=useDispatch();
    const cartTableRecord=useSelector(state=>state.dish.cartTableData);
    const dishesData=useSelector(state=>state.dish.Dishes);
    const customerDetail=useSelector(state=>state.dish.customerDetails);
    console.log("///////////////// CART ITEMS  ////////////////")
    console.log(cartTableRecord)

    // Working On IT
    // PEnding
    // Not Working Fine
    // Till Now just working on getting Food from single Kitchen
    let kitchens=[];
    let kitchenName;
    
    let newOrderId=0;
    //let senderToken=' ';
    let responseAfterPlacement;


    useEffect(()=>{
        for(let i=0;i<cartTableRecord.length;i++){
            let kitchen=dishesData.filter(dish=>dish.dish_id===cartTableRecord[0].dish_id)
            kitchens.push(kitchen[0])
        }
        console.log("/////////  Kitchens DATA /////////")
        console.log(kitchens)
        console.log(kitchens[0].kitchen_name);
        kitchenName=kitchens[0].kitchen_name;
        fetch(`http://${IP.ip}:3000/chef/getChefId/${kitchenName}`)
        .then((response)=>response.json())
        .then((response)=>setChefId(response[0].chef_id))
       .catch((error)=>console.error(error))
       .finally(()=>setChefLoading(false))
    },[chefLoading])
   

    useEffect(()=>{
        //const customerId='03082562292';
        const customerId=customerDetail.phone;
        Notifications.getExpoPushTokenAsync()
        .then(response=>{
          console.log(response);
          //senderToken=response.data;
          setSenderToken(response.data);
          console.log(`Sender Token is : ${senderToken}`);
        })
       .then(async ()=>{
        await fetch(`http://${IP.ip}:3000/customer/${customerId}`)
        .then((response)=>response.json())
        .then((response)=>setAddressDetails(response[0]))
       })     
       .then(()=>setRefreshing(false))
       .catch((error)=>console.error(error));
      },[isRefreshing]);

      
    useEffect(()=>{
        //const customerId='03082562292';
        const customerId=customerDetail.phone;
        fetch(`http://${IP.ip}:3000/cart/${customerId}`)
      .then((response)=>response.json())
      .then((response)=>setCartTable(response))
      .then(()=>dispatch(getCartData(cartTable)))
      .finally(()=>setLoading(false));
    },[isLoading])


    const placeOrder=()=>{
        let url=`http://${IP.ip}:3000/order`;
        let data={
            customerId:customerDetail.phone,

            //chefId:'03154562292',
            chefId:chefId,
            totalAmount:grandTotal,
            status:'pending'
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
            responseAfterPlacement=response;
            newOrderId=responseAfterPlacement.insertId;
            console.log(newOrderId);
            for(let i=0;i<allDishIds.length;i++){
                addOrderDetails(allDishIds[i]);
            }
            })
        .then(()=>ToastAndroid.show(`Order placed successfully`, ToastAndroid.SHORT))
        .then(()=>{
            sendNotificationsToChefs();
        })
        .then(()=>{
            deleteCartItems(customerDetail.phone);
        })
        .then(()=>{
            showAlert(newOrderId,data.totalAmount,addressDetails.firstname,addressDetails.phone,addressDetails.address);
            props.navigation.navigate({
                routeName:'Cart',
               
            })
        })
        .catch((error)=>console.log(error));
            
    }


            const addOrderDetails=(dish)=>{
                const orderItem=cartTableRecord.filter(food=>food.dish_id===dish)
                let url=`http://${IP.ip}:3000/orderDetail`;
                let data1={
                    orderId:newOrderId,
                    dishId:dish,
                    quantity:orderItem[0].quantity,
                    totalAmount:orderItem[0].total_amount
                    //totalAmount:subTotal
                }
                console.log(data1);
                fetch(url,{
                    method:'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(data1)
                })
                .then((response)=>response.json())
                .then(()=>{console.log("Till here working")})
                .then(()=>{console.log("Order detail API Working")})
                .catch((error)=>console.log(error));
        }


        const showAlert=(orderId,totalAmount,customerName,contact,address)=>{
            Alert.alert("You Placed the Order!",`Order#: ${orderId}\nTotal Amount : Rs.${totalAmount}\nCustomer Name : ${customerName}\nContact Number : ${contact}\nCompplete Address : ${address}`,[{
                text:'Okey!',
                style:'cancel'
            }]);
        }



        const deleteCartItems=(cust_id)=>{
            let url=`http://${IP.ip}:3000/cart/deleteCart/${cust_id}`;
            let data={
                    custId:cust_id
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
                .then(()=>dispatch(emptyTheCart()))
                .then(()=>dispatch(emptyTheCartTable()))
                .then(()=>console.log("Item Deleted"))
                .catch((error)=>console.log(error));
        }



        const sendNotificationsToChefs=()=>{
            for(const token of tokens){
                fetch('https://exp.host/--/api/v2/push/send',{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Accept-Encoding':'gzip,deflate',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        to:token,
                        data:{
                            sender:senderToken,
                            reciever:token,
                            orderId:newOrderId,
                            status:false
                        },
                        title:'Order For You',
                        body:"Customer placed order for you",  
                        experienceId: "@rehan.ali/chef-module-V1",
                    })
                }).then(()=>console.log("Chef's Notification Send"))
                    .then(()=>{
                            //send notification to Admin
                    fetch('https://exp.host/--/api/v2/push/send',{
                        method:'POST',
                        headers:{
                            'Accept':'application/json',
                            'Accept-Encoding':'gzip,deflate',
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({
                            to:'ExponentPushToken[jXY39COY1qo-vtkAP4_dnh]',
                            data:{
                                orderId:newOrderId,
                                sender:senderToken,
                                reciever:token,
                                orderStatus:'pending'
                            },
                            title:'New Pending Order',
                            body:`New Order Placed Order Id: #${newOrderId}`,  
                            experienceId: "@rehan.ali/Admin-module-app-V1",
                        })
                    }).then(()=>{
                        console.log("Notification Sent to Admin")
                    })
                    })

                    
            }

        }
    
        return(
          <ScrollView>
          <View style={styles.screen}>
             
            <AddressCard firstname={addressDetails.firstname} lastname={addressDetails.lastname} phone={addressDetails.phone} address={addressDetails.address}/>
            <View style={styles.card}>
            <View> 
                <Text style={styles.paymentHeader}>Payment Option</Text>
                <Text style={styles.paymentType}>Cash On Delivery</Text>
            </View>
            </View>
            

            <AmountCard subTotal={subTotal} deliveryCharges={deliveryCharges} grandTotal={grandTotal}
            proceed={false}
            />

            <View style={styles.btnContainer}>
            <TouchableOpacity onPress={placeOrder}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.btnTitle}>PLACE ORDER</Text>
                </View>
            </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
        )
    };


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
            paddingBottom:10
            
        },
        buttonContainer:{
            flexDirection:'row',
            backgroundColor:Colors.primaryColor,
            width:140,
            justifyContent:'center',
            alignItems:'center',
            padding:5,
            borderRadius:20
        },
        btnContainer:{
            flexDirection:'row',
            justifyContent:'center',
            paddingTop:10
        },
        btnTitle:{
            color:Colors.whiteColor,
            fontSize:16,
            paddingEnd:10
        },
        card:{
            width:'95%',
         backgroundColor:'#f5f5f5',
         borderRadius:15,
         elevation:5,
         padding:15,
         overflow:'hidden',
         marginVertical:5,
         marginHorizontal:10
       
        },
        paymentHeader:{
            fontSize:18,
            fontWeight:'bold',
            color:Colors.primaryColor
        }
       
    }
)

export default CheckoutScreen;
