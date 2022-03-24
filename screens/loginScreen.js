import React,{useState,useEffect} from "react";
import {View,ScrollView,Text,StyleSheet, Button, KeyboardAvoidingView,TextInput,TouchableOpacity,ToastAndroid} from 'react-native';
import Colors from "../constants/Colors";
import IP from "../constants/IP";
import { SvgUri } from 'react-native-svg';
import { useDispatch } from "react-redux";
import {LinearGradient} from 'expo-linear-gradient';
import { getCustomerDetail } from "../store/actions/dishActions";

const LoginScreen=(props)=>{

    const [isPhoneFocused,setPhoneFocused]=useState(false);
    const [isPassFocused,setPassFocused]=useState(false);

    const [phone,setPhone]=useState('');
    const [password,setPassword]=useState('');
    let authData;
    let customerData=[];
    const dispatch=useDispatch();
    
    
    const handlePhoneFocus=()=>setPhoneFocused(true);
    const handlePassFocus=()=>setPassFocused(true);

    const handlePhoneBlur=()=>setPhoneFocused(false);
    const handlePassBlur=()=>setPassFocused(false);


    const getData=async ()=>{
       const response=await fetch(`http://${IP.ip}:3000/customer/${phone}`)
       const custData=await response.json()
       customerData=custData
    }

    const LoginHandler=()=>{
      
        getData().then(()=>{
            //setCustomerData(data)
        if(customerData.length==0){
            console.log("User is not registered")
            ToastAndroid.show(`You are not registered`, ToastAndroid.SHORT)
        }
        else{
            let url=`http://${IP.ip}:3000/customer/login`;
            let data={
                phone:phone,
                password:password
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
                authData=response;
            })
            .then(()=>{
                if(authData.verification){
                    ToastAndroid.show(`You Logged In`, ToastAndroid.SHORT)
                    dispatch(getCustomerDetail(customerData[0]))
                    props.navigation.navigate({
                        routeName:'MainHome',
                        params:{ 
                            customer:customerData[0],      
                      }
                    })
                }
            })
         }
        })
    }



    return(
      
        <LinearGradient colors={["#FF620A","#FF620A"]} style={styles.screen}>
        <KeyboardAvoidingView behavior="padding"  keyboardVerticalOffset={30} style={styles.screen}>
            {/* <View style={styles.screen}> */}
            <LinearGradient colors={["#FFAB00","#FF620A"]} style={styles.gradient}>
            <View style={styles.appNameContainer}>
            <View style={styles.svgContainer}>
            <SvgUri
            width="100%"
            height="100%"
            uri={`http://${IP.ip}:3000/images/appLogo.svg`}
            />
            </View>
            <View style={{width:'100%',alignItems:'center'}}><Text style={{color:Colors.whiteColor,fontSize:20}}>CUSTOMER APP</Text></View>

            </View>
            <View style={styles.card}>
               
                <View style={{width:'100%',alignItems:'center'}}><Text style={{color:Colors.whiteColor,fontSize:18}}>LOGIN</Text></View>
                <View style={styles.inputTitles}><Text style={styles.inputHeader}>Phone</Text></View>    
                <TextInput style={{...styles.inputText,borderColor:isPhoneFocused
                 ? Colors.primaryColor
                 : '#F5FCFF',
                borderWidth: isPhoneFocused?1:0}}
                keyboardType = 'numeric' placeholder="03xxxx" onFocus={handlePhoneFocus} onBlur={handlePhoneBlur}
             value={phone} onChangeText={(text)=>setPhone(text)}
             />

            <View style={styles.inputTitles}><Text style={styles.inputHeader}>Password</Text></View>    
                <TextInput style={{...styles.inputText,borderColor:isPassFocused
                 ? Colors.primaryColor
                 : '#F5FCFF',
                borderWidth: isPassFocused?1:0}}
                autoCapitalize='none'
                secureTextEntry={true}
                placeholder="password" onFocus={handlePassFocus} onBlur={handlePassBlur}
             value={password} onChangeText={(text)=>setPassword(text)}
             />
            
              <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={LoginHandler}>
                <View style={styles.btnContainer}>
                    <Text style={styles.btnTitle}>Login</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                props.navigation.navigate('Signup')
            }}>
                <View style={{paddingVertical:10}}>
                    <Text style={{...styles.btnTitle,textDecorationLine:'underline'}}>create new account</Text>
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

LoginScreen.navigationOptions=()=>{
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
        width:350,
        height:350,
    },
    appNameContainer:{
        width:'100%',
        height:400,
        alignItems:'center'

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
       
    },

})

export default LoginScreen;