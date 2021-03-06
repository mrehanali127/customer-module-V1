import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import React from 'react';
import { Platform } from 'react-native';

import HomeScreen from '../screens/homeScreen';
import FavoritesScreen from '../screens/favoritesScreen';
import CartScreen from '../screens/cartScreen';
import ProfileScreen from '../screens/profileScreen';
import RestaurantsScreen from '../screens/restaurantsScreen';
import RestaurantDetailScreen from '../screens/restaurantDetailScreen';
import FoodItemDetailsScreen from '../screens/foodItemDetailsScreen';
import WeeklyPlansListScreen from '../screens/weeklyPlansListScreen';
import WeeklyPlanDetailsScreen from '../screens/weeklyPlanDetailsScreen';
import CheckoutScreen from '../screens/checkoutScreen';
import LoginScreen from '../screens/loginScreen';
import SignupScreen from '../screens/signupScreen';
import PasswordScreen from '../screens/passwordScreen';
import OTPScreen from '../screens/otpTakingScreen';
import NotificationScreen from '../screens/notificationScreen';
import MyOrdersScreen from '../screens/myOrdersScreen';
import MyPlanScreen from '../screens/myPlanScreen';


const defaultNavConfiguration= {
    //set Default Configuration
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Colors.primaryColor
        },
        headerTintColor:'white',
        
    }
}

const HomeNavigator=createStackNavigator(
    {
        Home: HomeScreen,
        FoodDetail:FoodItemDetailsScreen,
        RestaurantDetail:RestaurantDetailScreen,
        Notifications:NotificationScreen,
        WeeklyPlansList:WeeklyPlansListScreen,
        WeeklyPlanDetails:WeeklyPlanDetailsScreen  
    },defaultNavConfiguration
);

const FavoritesNavigator=createStackNavigator(
    {
        Favorites:FavoritesScreen,
        FoodDetail:FoodItemDetailsScreen,
        
    },defaultNavConfiguration
);

const RestaurantsNavigator=createStackNavigator(
    {    
        Restaurants:RestaurantsScreen,
        RestaurantDetail:RestaurantDetailScreen,
        FoodDetail:FoodItemDetailsScreen
    },defaultNavConfiguration
);

const CartNavigator=createStackNavigator(
    {  
        Cart:CartScreen,
        Checkout:CheckoutScreen
    },defaultNavConfiguration
);

const ProfileNavigator=createStackNavigator(
    {      
        Profile:ProfileScreen,
        MyOrders:MyOrdersScreen,  
        MyPlan:MyPlanScreen, 
        WeeklyPlanDetails:WeeklyPlanDetailsScreen  
    },defaultNavConfiguration
);


const navigationConfiguration={
    Restaurants:{
        screen:RestaurantsNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return (<Ionicons name='ios-restaurant' size={24} color={tabInfo.tintColor}/>)
            }
        },
    },
    Favorites:{
        screen:FavoritesNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return (<MaterialIcons name="favorite" size={24} color={tabInfo.tintColor} />)
            }
        }
    },
    Home:{
        screen:HomeNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return (<Ionicons name="md-home" size={24} color={tabInfo.tintColor} />)
            }
        }
    },

    Cart:{
        screen:CartNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return (<Ionicons name="cart" size={24} color={tabInfo.tintColor} />)
            }
        }
    },
    Profile:{
        screen:ProfileNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return (<FontAwesome name="user" size={24} color={tabInfo.tintColor} />)
            }
        }
    }
}



const MealsBottomNavigator=Platform.OS === 'android'
? createMaterialBottomTabNavigator(
   navigationConfiguration,{
       activeColor:Colors.primaryColor,
       inactiveColor:'#888',
       shifting:true,
       barStyle:{backgroundColor:Colors.whiteColor},
       initialRouteName:'Home'
       
   }
) 
: createBottomTabNavigator(
  navigationConfiguration,{
       tabBarOptions:{
           activeTintColor:Colors.primaryColor
       } 
   });

const AuthNavigator=createStackNavigator(
    {  
        Login:LoginScreen,
        Signup:SignupScreen,
        OTP:OTPScreen,
        Password:PasswordScreen
    },defaultNavConfiguration
)

const MainNavigator=createSwitchNavigator({
    Auth:AuthNavigator,
    MainHome:MealsBottomNavigator
})

export default createAppContainer(MainNavigator);