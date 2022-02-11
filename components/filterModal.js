import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,Modal } from "react-native";
import Colors from '../constants/Colors';;

const FilterModal=()=>{

   
        return(
                <View>
               <Modal
                transparent={true}
                visible={props.showModal}
                //visible={showModal}
                >
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                    <View style={{backgroundColor:'#fff',margin:40,marginTop:120,borderRadius:10,padding:10}}>
                    <View style={styles.filterHeader}>
                    <Text style={styles.filterheaderText}>Cuisines</Text>
                    </View>
                 
                <View style={{...styles.btnContainer,justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=>{
                    //setShowModal(false);
                    }}>       
                <View style={{...styles.buttonContainer,backgroundColor:Colors.primaryLightColor}}>
                    <Text style={styles.btnTitle}>Cancel</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                  
                    //setShowModal(false);
                    }}>
                <View style={{...styles.buttonContainer}}>
                    <Text style={styles.btnTitle}>Apply</Text>
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
            alignItems:'center',
            justifyContent:'center'
        },
        buttonContainer:{
            backgroundColor:Colors.primaryColor,
            justifyContent:'center',
            alignItems:'center',
            padding:3,
            width:100,
            marginHorizontal:5,
            marginBottom:5,
            borderRadius:10
        },
        btnContainer:{
            flexDirection:'row',
            justifyContent:'flex-end',
            
        },
        btnTitle:{
            color:Colors.whiteColor,
            fontSize:16,
        }
     
       
    }
)

export default FilterModal;