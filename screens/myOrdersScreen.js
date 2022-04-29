import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,RefreshControl,Alert,Modal,Image,ToastAndroid } from "react-native";
import Colors from '../constants/Colors';

import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getCustomerOrders,updateOrderStatus } from "../store/actions/dishActions";
import OrderCard from "../components/orderCard";
import IP from "../constants/IP";


const MyOrdersScreen=(props)=>{

   
    const [customerToken,setCustomerToken]=useState('');
    const [chefToken,setChefToken]=useState('');
    //const [customerOrders,setCustomerOrders]=useState([]);
    const [refreshing,setRefreshing]=useState(true);
    const [showModal,setShowModal]=useState(false);
    const [showRateModal,setShowRateModal]=useState(false);
    const [selectedOrderId,setSelectedOrderId]=useState(0);
    const [ratedOrderId,setRatedOrderId]=useState(0);
    const [selectedKitchen,setSelectedKitchen]=useState('');
    const [customerData,setCustomerData]=useState({});
    const [items,setItems]=useState([]);

    const [defaultRating,setDefaultRating]=useState(2);
    const [maxRating,setMaxRating]=useState([1,2,3,4,5]);

    const starImgFilled='https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
    const starImgCorner='https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

    const customerDetail=useSelector(state=>state.dish.customerDetails);
    const customerOrders=useSelector(state=>state.dish.CustomerOrders);


    const dispatch=useDispatch();
    //const chefOrders=useSelector(state=>state.order.Orders);


    useEffect(()=>{
        const customerId=customerDetail.phone;
            fetch(`http://${IP.ip}:3000/order/customerOrders/${customerId}`)
            .then((response)=>response.json())
            .then((response)=>{
            dispatch(getCustomerOrders(response));
        })
        .then(()=>setRefreshing(false))
        .catch((error)=>console.error(error))   
      },[refreshing]);
    
      
      // Function to confirm the order
      const updateOrderAsCancelled=(orderId)=>{
        let url=`http://${IP.ip}:3000/order/updateStatus/${orderId}`;
        let data={
            status:'cancelled',
        }
        fetch(url,{
            method:'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>showAlert(orderId,"Order Cancelled!")) 
        .then(()=>dispatch(updateOrderStatus(orderId,'cancelled')))       
        //.then(()=>setRefreshing(true))
        .catch((error)=>console.error(error))   
      }


      const showAlert=(orderId,title)=>{
        Alert.alert(`${title}`,`Order# : ${orderId}\nCustomer Name : ${customerDetail.firstname} ${customerDetail.lastname}\nTotal Items : ${items.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0)}\nTotal Amount : ${items.map(item => item.total_amount).reduce((prev, curr) => prev + curr, 0)}\n`,[{
            text:'Okey!',
            style:'cancel'
        }]);
    }


      const renderNotificationCard=(itemData)=>{  
        return(
            <OrderCard
            timeOfOrder={itemData.item.time}
            orderId={itemData.item.order_id}
            forOrderScreen
            status={itemData.item.status}
            currentStatus={itemData.item.status}

            onViewDetails={()=>{
                    setSelectedOrderId(itemData.item.order_id);
                    setSelectedKitchen(itemData.item.kitchen_name);
                    getOrderDetailsList(itemData.item.order_id);
                    console.log(selectedOrderId);
                    setShowModal(true);
            }}
            onRate={()=>{
                setRatedOrderId(itemData.item.order_id);
                setDefaultRating(itemData.item.rating);
                setShowRateModal(true);
            }}

            onSelect={()=>{
    
                setShowModal(false);

           }}



           onCancel={()=>{
            updateOrderAsCancelled(itemData.item.order_id);
            fetch(`http://${IP.ip}:3000/notifications/order/${itemData.item.order_id}`)
            .then((response)=>response.json())
           // .then((response)=>setNotificationData(response))
           // .then(()=>console.log(notificationData)) 
            .then((response)=>{
            console.log(response);
            setCustomerToken(response[0].sender);
            setChefToken(response[0].reciever);
            console.log(chefToken);
            console.log("%%%%%%%%%%%%%%%%%%");
            })
            .then(()=>{
                console.log("Fetching.........");
                fetch('https://exp.host/--/api/v2/push/send',{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Accept-Encoding':'gzip,deflate',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        to:chefToken,
                        data:{
                            sender:customerToken,
                            reciever:chefToken,
                            orderId:itemData.item.order_id,
                            status:false
                        },
                        title:"Sorry, Customer change his mood",
                        body:"Customer Cancelled the Order that he has placed",  
                        //experienceId: "@rehan.ali/customer-module-V1",
                    })
                }).then(()=>console.log("Cancelled notification sent to Chef"))
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
                            orderId:itemData.item.order_id,
                            sender:customerToken,
                            reciever:chefToken,
                            orderStatus:'cancelled'
                        },
                        title:`Customer Cancelled The Order`,
                        body:`Order Cancelled Order Id: #${itemData.item.order_id}`,  
                        experienceId: "@rehan.ali/Admin-module-app-V1",
                    })
                }).then(()=>{
                    console.log("Notification Sent to Admin")
                })
                })
            })
            .then(()=>{console.log("Clicked Working")})
            .catch((error)=>console.error(error));  
           }}
           />
           )
       }

       const getOrderDetailsList=(orderId)=>{
        fetch(`http://${IP.ip}:3000/orderDetail/orderedDishes/${orderId}`)
        .then((response)=>response.json())
        .then((response)=>setItems(response))
        .then(()=>console.log(items))
        .catch((error)=>console.error(error))
       }


       const renderOrderItem=(itemData)=>{
        return(
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',}}>
              <Text style={{flex:4}}>{itemData.item.dish_name}</Text>
              <Text style={{flex:1}}>{itemData.item.quantity}</Text>
              <Text style={{flex:1}}>{itemData.item.total_amount}</Text>
            </View>
        )
        }

        const CustomRatingBar=()=>{
            return(
                <View style={styles.customRatingBarStyle}>
                    {
                        maxRating.map((item,key)=>{
                            return(
                                <TouchableOpacity
                                activeOpacity={0.7}
                                key={item}
                                onPress={()=>setDefaultRating(item)}
                                >
                                
                                <Image
                                style={styles.starImgStyle}
                                source={
                                    item<=defaultRating
                                    ? {uri:starImgFilled}
                                    : {uri:starImgCorner}
                                }
                                />

                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            )
        }

        return(
          <View style={styles.screen}>
            <View style={styles.kitchenContainer}>
            <FlatList 
            //data={ordersData}
            data={customerOrders} renderItem={renderNotificationCard} keyExtractor={(item)=>item.order_id}
            showsVerticalScrollIndicator={false}
            />
            </View>


            <Modal
                transparent={true}
                visible={showModal}>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                    <View style={{backgroundColor:'#fff',margin:40,marginTop:120,borderRadius:10,padding:10}}>
                    <View style={styles.orderHeader}>
                    <Text style={styles.headerText}>Order Details</Text>
                    </View>
                    <Text style={styles.title}>Order Id: #{selectedOrderId}</Text>
                    <Text style={styles.subTitle}>Kitchen Name: {selectedKitchen}</Text>
                  
                    <Text style={styles.headerText}>Ordered Dishes</Text>
                    <View>
                    {/*<OrderDetailsComponent orderID={selectedOrderId}/>*/}
                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-around',}}>
                    <Text style={{...styles.title,flex:2.5,fontSize:14}}>Dish Name</Text>
                    <Text style={{...styles.title,flex:1,fontSize:14}}>Quantity</Text>
                    <Text style={{...styles.title,flex:1,fontSize:14}}>Amount</Text>
                    </View>
                    <FlatList 
                    data={items} renderItem={renderOrderItem} keyExtractor={(item)=>item.dish_id}
                    showsVerticalScrollIndicator={false}
                    />
                    <View style={{width:'95%',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{...styles.title,fontSize:14}}>Total Amount: </Text>
                    <Text style={{...styles.title,fontSize:14}}>Rs.{items.map(item => item.total_amount).reduce((prev, curr) => prev + curr, 0)}</Text>
                    </View>
                    </View>

                    {/*<OrderDetailsTable orderID={selectedOrderId}/>*/}   
                <View style={{...styles.btnContainer,justifyContent:'flex-end'}}>
                <TouchableOpacity onPress={()=>{
                    setShowModal(false);
                    }}>       
                <View style={{...styles.buttonContainer,backgroundColor:Colors.primaryLightColor,paddingHorizontal:10,borderRadius:10}}>
                    <Text style={{...styles.btnTitle,fontSize:14}}>OK</Text>
                </View>
                </TouchableOpacity>
                </View>

                </View>
                </View>
            </Modal>





            <Modal
                transparent={true}
                visible={showRateModal}>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                    <View style={{backgroundColor:'#fff',margin:40,marginTop:120,borderRadius:10,padding:10}}>
                    <View style={styles.orderHeader}>
                    <Text style={styles.headerText}>Rate Us!!</Text>
                    </View>
                    <Text style={styles.subTitle}>Your time is required to get review. This will help us to improve our service.</Text>
                    <Text style={styles.subTitle}>Kindly Rate This Order</Text>
                   <CustomRatingBar/>
                   <View style={styles.textContainer}>
                   <Text style={styles.textStyle}>
                       {defaultRating===1 && 'Very Poor'}
                       {defaultRating===2 && 'Poor'}
                       {defaultRating===3 && 'Satisfactory'}
                       {defaultRating===4 && 'Good'}
                       {defaultRating===5 && 'Very Good'}
                   </Text>
                   </View>

                   
                    <View>
                   
                    </View>

                    {/*<OrderDetailsTable orderID={selectedOrderId}/>*/}   
                <View style={{...styles.btnContainer,justifyContent:'flex-end'}}>
                <TouchableOpacity onPress={()=>{
                    let hittingUrl=`http://${IP.ip}:3000/order/updateRating/${ratedOrderId}`;
                    let data={
                        rating:defaultRating,
                    }
                    fetch(hittingUrl,{
                        method:'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                          },
                        body:JSON.stringify(data)
                    }).then((response)=>response.json())
                     .then(()=>setShowRateModal(false))
                     .then(()=>ToastAndroid.show(`Your feedback has been saved`, ToastAndroid.SHORT))
                    .catch((error)=>console.error(error)) 
                    
                    }}>       
                <View style={{...styles.buttonContainer,backgroundColor:Colors.primaryLightColor,paddingHorizontal:10,borderRadius:10}}>
                    <Text style={{...styles.btnTitle,fontSize:14}}>Submit</Text>
                </View>
                </TouchableOpacity>
                </View>

                </View>
                </View>
            </Modal>


          </View>
        )
    };


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
            
        },
        buttonContainer:{
            flexDirection:'row',
            backgroundColor:Colors.primaryColor,
            justifyContent:'center',
            padding:10,
            borderRadius:20
        },
        btnContainer:{
            flexDirection:'row',
            justifyContent:'center',
            paddingTop:15
        },
        btnTitle:{
            color:Colors.whiteColor,
            fontSize:16,
           
            paddingEnd:10
        },
        kitchenContainer:{
            width:'100%',
            flex:1
           
         },
         orderHeader:{
            justifyContent:'center',
            alignItems:'center'
        }, 
        headerText:{
            color:Colors.primaryColor,
            fontSize:16,
            marginBottom:5,
            fontWeight:'bold'
        }, 
        title:{
            fontSize:16,
            fontWeight:"bold",
            color:'#000'
        },
        subTitle:{
            fontSize:16,
            color:"#000"
        },
        customRatingBarStyle:{
            justifyContent:'center',
            flexDirection:'row',
            margin:5,
        },
        starImgStyle:{
            width:30,
            height:30,
            resizeMode:'cover'
        },
        textStyle:{
            fontSize:16,
            fontWeight:'bold',
          
        },
        textContainer:{
            justifyContent:'center',
            width:'100%',
            alignItems:'center'
        }


       
    }
)

export default MyOrdersScreen;
