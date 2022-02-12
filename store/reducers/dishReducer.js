import { GET_DISHES_DATA,GET_DISHES_OF_KITCHEN,
    MANAGE_CART_ITEMS,MANAGE_FAVORITES,
    TOGGLE_FAVORITE,REMOVE_CART_ITEM,
    ADD_CART_ITEM,EMPTY_THE_CART,
    GET_CART_TABLE_DETAILS,
    GET_CATEGORICAL_DATA,APPLY_CATEGORY,
    SEARCH_INPUT,GET_SELECTED_CUISINES
 } from "../actions/dishActions";

import IP from "../../constants/IP";




const initialState={
    Dishes: [],
    favoritesIds:[],
    cartItems:[],
    cartTableData:[],
    categoricalDishes:[],
    searchInput:'',
    selectedCuisines:[]
}

const dishReducer=(state=initialState,action)=>{
    switch(action.type){
        case SEARCH_INPUT:
            return{...state,searchInput:action.searchItem};

        case GET_DISHES_DATA:
          return {...state,Dishes:action.dishes};
        
        case GET_SELECTED_CUISINES:
            return {...state,selectedCuisines:action.cuisines};
        
        case GET_CATEGORICAL_DATA:
            return {...state,categoricalDishes:action.dishes};
        case APPLY_CATEGORY:
            //const ifExist=state.favoritesIds.findIndex(dish=>dish.dish_id===action.dishId);
            //return{...state,categoricalDishes:}
            return {...state,categoricalDishes:action.categoryItems};
           
        case GET_DISHES_OF_KITCHEN:
            return state
        case MANAGE_FAVORITES:
            return {...state,favoritesIds:action.favItems}
        case TOGGLE_FAVORITE:
            const ifExist=state.favoritesIds.findIndex(dish=>dish.dish_id===action.dishId);
            if(ifExist>=0){
                const latestFavorites=[...state.favoritesIds];
                latestFavorites.splice(ifExist,1);
                return {...state,favoritesIds:latestFavorites};
            }
            else{
                const dish=state.Dishes.find(item=>item.dish_id===action.dishId);
                return {...state,favoritesIds:state.favoritesIds.concat(dish)}
            }
        case GET_CART_TABLE_DETAILS:
            return{...state,cartTableData:action.cartData};
        case MANAGE_CART_ITEMS:
            return {...state,cartItems:action.cartItems};
        case ADD_CART_ITEM:
            const dish=state.Dishes.find(item=>item.dish_id===action.newItemId);
            return {...state,cartItems:state.cartItems.concat(dish)};
        case REMOVE_CART_ITEM:
            const indexItem=state.cartItems.findIndex(dish=>dish.dish_id===action.cartItemId);
            const updateCart=[...state.cartItems];
            updateCart.splice(indexItem,1);
            return{...state,cartItems:updateCart};
        case EMPTY_THE_CART:
            return{...state,cartItems:[]};

        default:
            return state;    
    }
    //return state;
  
}

export default dishReducer;