import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Colors from '../constants/Colors';
import React from 'react';

import HomeScreen from '../screens/homeScreen';
import FavoritesScreen from '../screens/favoritesScreen';
import CartScreen from '../screens/cartScreen';
import ProfileScreen from '../screens/profileScreen';
import RestaurantsScreen from '../screens/restaurantsScreen';

const HomeNavigator=createStackNavigator(
    {
        Home: HomeScreen,
        Favorites:FavoritesScreen,
        Cart:CartScreen,
        Profile:ProfileScreen,
        Restaurants:RestaurantsScreen
    },
);

const MealsBottomNavigator=createBottomTabNavigator({
    Home:HomeNavigator,
    Favorites:FavoritesScreen,
    Cart:CartScreen
})

export default createAppContainer(MealsBottomNavigator);