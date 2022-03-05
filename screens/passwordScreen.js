import React,{useState,useEffect} from "react";
import {View,ScrollView,Text,StyleSheet, Button, KeyboardAvoidingView,TextInput,TouchableOpacity,ToastAndroid} from 'react-native';
import Colors from "../constants/Colors";
import IP from "../constants/IP";
import { SvgUri } from 'react-native-svg';
import {LinearGradient} from 'expo-linear-gradient';
import { useSelector,useDispatch } from "react-redux";
import { getCustomerDetail } from "../store/actions/dishActions";


const PasswordScreen=(props)=>{

    const [isPassFocused,setPassFocused]=useState(false);
    const [isConfirmPassFocused,setConfirmPassFocused]=useState(false);
    const [refreshing,setRefreshing]=useState(true);
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const customerDetails=props.navigation.getParam('customer');

    const dispatch=useDispatch();
    
    const handlePassFocus=()=>setPassFocused(true);
    const handlePassBlur=()=>setPassFocused(false);
    const handleConfirmFocus=()=>setConfirmPassFocused(true);
    const handleConfirmBlur=()=>setConfirmPassFocused(false);



    const LoginHandler=()=>{
        
        if(password!==confirmPassword){
            console.log("Unmatched Password")
            ToastAndroid.show(`Password Unmatched! Try Again`, ToastAndroid.SHORT)
        }
        else{
            let url=`http://${IP.ip}:3000/customer/register`;
                        let tempData=customerDetails;
                        tempData['password']=password;
                        let data= tempData
                        fetch(url,{
                            method:'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body:JSON.stringify(data)
                        }).then((response)=>response.json())
                        .then((response)=>console.log(response))
                        .then(()=>console.log("Working...."))
                        .then(()=>dispatch(getCustomerDetail(customerDetails)))
                        .then(()=>ToastAndroid.show(`Account Created Successfuly`, ToastAndroid.SHORT))
                        .then(()=>props.navigation.navigate('MainHome'))

         }
       
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
               
                <View style={{width:'100%',alignItems:'center'}}><Text style={{color:Colors.whiteColor,fontSize:18}}>LOGIN</Text></View>
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

            <View style={styles.inputTitles}><Text style={styles.inputHeader}>Confirm Password</Text></View>    
                <TextInput style={{...styles.inputText,borderColor:isConfirmPassFocused
                 ? Colors.primaryColor
                 : '#F5FCFF',
                borderWidth: isConfirmPassFocused?1:0}}
                autoCapitalize='none'
                secureTextEntry={true}
                placeholder="confirm password" onFocus={handleConfirmFocus} onBlur={handleConfirmBlur}
             value={confirmPassword} onChangeText={(text)=>setConfirmPassword(text)}
             />
            

            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={LoginHandler}>
                <View style={styles.btnContainer}>
                    <Text style={styles.btnTitle}>CONFIRM</Text>
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

PasswordScreen.navigationOptions=()=>{
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
        height:250,
        maxHeight:250,
        //backgroundColor:Colors.whiteColor,
        backgroundColor:'rgba(255,255,255,0.3)',
        padding:10,
        borderRadius:20,
        
    },
    svgContainer:{
        width:350,
        height:350,
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

export default PasswordScreen;