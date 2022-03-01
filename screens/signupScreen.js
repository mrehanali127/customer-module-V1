import React,{useState,useEffect} from "react";
import {View,ScrollView,Text,StyleSheet, Button, KeyboardAvoidingView,TextInput,TouchableOpacity,ToastAndroid,Picker} from 'react-native';

import Colors from "../constants/Colors";
import IP from "../constants/IP";
import { SvgUri } from 'react-native-svg';
import {LinearGradient} from 'expo-linear-gradient'

const SignupScreen=(props)=>{

    const [isFnameFocused,setFnameFocused]=useState(false);
    const [isLnameFocused,setLnameFocused]=useState(false);
    const [isPhoneFocused,setPhoneFocused]=useState(false);
    const [isAddressFocused,setAddressFocused]=useState(false);
    //const [customerData,setCustomerData]=useState([]);
    const [refreshing,setRefreshing]=useState(true);
    //const [authData,setAuthData]=useState({});
    const [phone,setPhone]=useState('');
    const [fname,setFname]=useState('');
    const [lname,setLname]=useState('');
    const [city,setCity]=useState('Mianwali');
    const [address,setAddress]=useState('');
    
    let authData;
    let customerData=[];
    
    
    const handlePhoneFocus=()=>setPhoneFocused(true);
    const handleFnameFocus=()=>setFnameFocused(true);
    const handleLnameFocus=()=>setLnameFocused(true);
    const handleAddressFocus=()=>setAddressFocused(true);

    const handlePhoneBlur=()=>setPhoneFocused(false);
    const handleFnameBlur=()=>setFnameFocused(false);
    const handleLnameBlur=()=>setLnameFocused(false);
    const handleAddressBlur=()=>setAddressFocused(false);


    useEffect(async ()=>{
        fetch(`http://${IP.ip}:3000/customer/${phone}`)
        .then((response)=>response.json())
        .then((response)=>{customerData=response})
        //.then((response)=>setCustomerData(response))
        .then(()=>console.log(customerData))
    },[phone,refreshing])
    

    const getData=async ()=>{
       const response=await fetch(`http://${IP.ip}:3000/customer/${phone}`)
       const custData=await response.json()
       customerData=custData
    }

    const LoginHandler=()=>{
        let trimNum = phone.substring(1);
        let numForQuery='92'+trimNum;

        getData().then(()=>{
            setRefreshing(false);
        if(customerData.length>0){
            console.log("User is already Registered")
            ToastAndroid.show(`You are already registered!!`, ToastAndroid.SHORT)
        }
        else{
            let url=`http://${IP.ip}:3000/sendOTP`;
            let data={
                phone:numForQuery,
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
                //setAuthData(response)
                authData=response;
            })
           
            .then(()=>ToastAndroid.show(`OTP sent to you`, ToastAndroid.SHORT))
            .then(()=>console.log(authData))
            .then(()=>{
                props.navigation.navigate({
                    routeName:'OTP',
                    params:{
                        otpData:authData,  
                        customer:{
                            phone:phone,
                            firstname:fname,
                            lastname:lname,
                            city:city,
                            address:address
                        },      
                  }
                })
            })
         }
        })
    }



    return(
       
        <LinearGradient colors={["#FF620A","#FF620A"]} style={styles.screen}>
        <KeyboardAvoidingView behavior="padding"  keyboardVerticalOffset={30} style={styles.screen}>
            {/* <View style={styles.screen}> */}
            <LinearGradient colors={["#FFAB00","#FF620A"]} style={styles.gradient}>
            <View style={styles.svgContainer}>
            <SvgUri
            width="100%"
            height="100%"
            uri={`http://${IP.ip}:3000/images/appLogo.svg`}
            />
            </View>
            <View style={styles.card}>
               <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{width:'100%',alignItems:'center'}}><Text style={{color:Colors.whiteColor,fontSize:18}}>CREATE ACCOUNT</Text></View>
                <View style={styles.inputTitles}><Text style={styles.inputHeader}>First Name</Text></View>    
                <TextInput style={{...styles.inputText,borderColor:isFnameFocused
                 ? Colors.primaryColor
                 : '#F5FCFF',
                borderWidth: isFnameFocused?1:0}}
                placeholder="First Name" onFocus={handleFnameFocus} onBlur={handleFnameBlur}
             value={fname} onChangeText={(text)=>setFname(text)}
             />
             <View style={styles.inputTitles}><Text style={styles.inputHeader}>Last Name</Text></View>    
                <TextInput style={{...styles.inputText,borderColor:isLnameFocused
                 ? Colors.primaryColor
                 : '#F5FCFF',
                borderWidth: isLnameFocused?1:0}}
                placeholder="Last Name" onFocus={handleLnameFocus} onBlur={handleLnameBlur}
             value={lname} onChangeText={(text)=>setLname(text)}
             />
             <View style={styles.inputTitles}><Text style={styles.inputHeader}>Phone</Text></View>    
                <TextInput style={{...styles.inputText,borderColor:isPhoneFocused
                 ? Colors.primaryColor
                 : '#F5FCFF',
                borderWidth: isPhoneFocused?1:0}}
                keyboardType = 'numeric' placeholder="03xxxx" onFocus={handlePhoneFocus} onBlur={handlePhoneBlur}
             value={phone} onChangeText={(text)=>setPhone(text)}
             />
              <View style={styles.inputTitles}><Text style={styles.inputHeader}>City</Text></View>  
              <Picker
                selectedValue={city}
                style={{height:30,width: '90%',marginHorizontal:15,color:"#fff"}}
                onValueChange={(itemValue) => setCity(itemValue)}
            >
                <Picker.Item label="Mianwali" value="Mianwali" />
        
             </Picker>

             <View style={styles.inputTitles}><Text style={styles.inputHeader}>Address</Text></View>    
                <TextInput style={{...styles.inputText,borderColor:isAddressFocused
                 ? Colors.primaryColor
                 : '#F5FCFF',
                borderWidth: isAddressFocused?1:0}}
                multiline = {true}
                numberOfLines = {3}
                placeholder="Complete Address" onFocus={handleAddressFocus} onBlur={handleAddressBlur}
             value={address} onChangeText={(text)=>setAddress(text)}
             />
              <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={LoginHandler}>
                <View style={styles.btnContainer}>
                    <Text style={styles.btnTitle}>SIGN UP</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                props.navigation.pop();
            }}>
                <View style={{paddingVertical:10}}>
                    <Text style={{...styles.btnTitle,textDecorationLine:'underline'}}>Already Have Account? Login</Text>
                </View>
            </TouchableOpacity>
            </View>
            </ScrollView>
            </View>
            </LinearGradient>
            </KeyboardAvoidingView>
            </LinearGradient>
    
    )

}

SignupScreen.navigationOptions=()=>{
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
        height:300,
        maxHeight:300,
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

export default SignupScreen;