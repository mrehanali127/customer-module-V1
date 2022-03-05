import React,{useState,useEffect} from "react";
import {View,ScrollView,Text,StyleSheet, Button, KeyboardAvoidingView,TextInput,TouchableOpacity,ToastAndroid} from 'react-native';
import Colors from "../constants/Colors";
import IP from "../constants/IP";
import { useDispatch } from "react-redux";
import { SvgUri } from 'react-native-svg';
import {LinearGradient} from 'expo-linear-gradient'
import { getCustomerDetail } from "../store/actions/dishActions";

const OTPScreen=(props)=>{

    const [isOTPFocused,setOTPFocused]=useState(false);
    const [otp,setOtp]=useState('');
   
    let verResponse={};
    let dataOfCustomer;
    const authenticationData=props.navigation.getParam('otpData');
    const customerData=props.navigation.getParam('customer');
   
    const dispatch=useDispatch();
    
    const handleOTPFocus=()=>setOTPFocused(true);
    const handleOTPBlur=()=>setOTPFocused(false);

    const getData=async ()=>{
        const response=await fetch(`http://${IP.ip}:3000/customer/${customerData.phone}`)
        const custData=await response.json()
        dataOfCustomer=custData
        //setCustomerData(custData)
     }

    const OTPHandler=()=>{
        
            let url=`http://${IP.ip}:3000/verifyOTP`;
            let data={
                hash:authenticationData.hash,
                phone:authenticationData.phone,
                otp:otp
            };
            fetch(url,{
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data)
            }).then((response)=>response.json())
            .then((response)=>{verResponse=response})
            .then(()=>console.log(verResponse))
            .then(()=>ToastAndroid.show(verResponse.msg, ToastAndroid.SHORT))
            .then(()=>{
                if(verResponse.verification===true){
                    getData().then(()=>{
                    if(dataOfCustomer.length===0){
                        console.log("entered .....")
                        props.navigation.navigate({
                            routeName:'Password',
                            params:{
                                
                                customer:customerData,
                          }
                        })
                    }
                    })
                   
                }
                else if(verResponse.verification===false){
                    props.navigation.goBack();
                }
            })   
    }



    return(
       
        <LinearGradient colors={["#FF620A","#FF620A"]} style={styles.screen}>
        <KeyboardAvoidingView behavior="padding"  keyboardVerticalOffset={30} style={styles.screen}>
        
            <LinearGradient colors={["#FFAB00","#FF620A"]} style={styles.gradient}>
            <View style={styles.svgContainer}>
            <SvgUri
            width="100%"
            height="100%"
            uri={`http://${IP.ip}:3000/images/appLogo.svg`}
            />
            </View>
            <View style={styles.card}>
               
                <View style={{width:'100%',alignItems:'center'}}><Text style={{color:Colors.whiteColor,fontSize:18}}>VERIFY</Text></View>
                <View style={styles.inputTitles}><Text style={styles.inputHeader}>OTP</Text></View>    
                <TextInput style={{...styles.inputText,borderColor:isOTPFocused
                 ? Colors.primaryColor
                 : '#F5FCFF',
                borderWidth: isOTPFocused?1:0}} 
                keyboardType="number-pad"
                placeholder="e.g: 123456" onFocus={handleOTPFocus} onBlur={handleOTPBlur}
             value={otp} onChangeText={(text)=>setOtp(text)}
             />
              <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={OTPHandler}>
                <View style={styles.btnContainer}>
                    <Text style={styles.btnTitle}>verifyOTP</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                props.navigation.goBack();
            }}>
                <View style={{paddingVertical:10}}>
                    <Text style={{...styles.btnTitle,textDecorationLine:'underline'}}>Back to Login</Text>
                </View>
            </TouchableOpacity>
            </View>

            </View>
            </LinearGradient>
            {/* </View> */}
            </KeyboardAvoidingView>
            </LinearGradient>
    
    )

}

OTPScreen.navigationOptions=()=>{
    return{
        headerShown:false
    }
}

const styles=StyleSheet.create({



    screen:{
        flex:1,
        
       
    },
    gradient:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        //justifyContent:'center'
        justifyContent:'center'
    },
    card:{
        width:'80%',
        height:200,
        maxHeight:200,
        //backgroundColor:Colors.whiteColor,
        backgroundColor:'rgba(255,255,255,0.3)',
        padding:10,
        borderRadius:20,
        
    },
    svgContainer:{
        width:400,
        height:400,
    },
    inputTitles:{
        padding:5,
        marginLeft:15,
        
    },
    inputText:{
        marginHorizontal:20,
        //borderWidth:0.5,
        backgroundColor: '#F5FCFF',
        padding:5,
        paddingHorizontal:10,
        borderRadius:10,
        fontSize:16
    },
    inputHeader:{
        fontSize:16,
        color:Colors.whiteColor
    },
    buttonContainer:{
  
        width:'100%',
        alignItems:'center',
        padding:10,
        
        
    },
    btnContainer:{
       //flex:1,
       width:150,
       height:40,
        backgroundColor:Colors.primaryColor,
        padding:5,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center'
        
    },
    buttonsContainer:{
      flex:1,
      flexDirection:'row',
      paddingTop:10,
      width:'50%',
      justifyContent:'space-between'
    },
    btnTitle:{
        color:Colors.whiteColor,
        fontSize:16,
        paddingEnd:10
    },

})

export default OTPScreen;