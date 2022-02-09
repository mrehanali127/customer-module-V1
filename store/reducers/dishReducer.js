import { GET_DISHES_DATA,GET_DISHES_OF_KITCHEN,
    MANAGE_CART_ITEMS,MANAGE_FAVORITES,
    TOGGLE_FAVORITE,REMOVE_CART_ITEM,
    ADD_CART_ITEM } from "../actions/dishActions";

import IP from "../../constants/IP";




const initialState={
    Dishes: [],
    favoritesIds:[],
    cartItems:[],
}

const dishReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_DISHES_DATA:
          return {...state,Dishes:action.dishes}
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

        default:
            return state;    
    }
    //return state;
  
}

export default dishReducer;