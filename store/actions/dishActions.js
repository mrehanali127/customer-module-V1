export const GET_DISHES_DATA='GET_DISHES_DATA';
export const GET_DISHES_OF_KITCHEN='GET_DISHES_OF_KITCHEN';
export const MANAGE_FAVORITES='MANAGE_FAVORITES';
export const TOGGLE_FAVORITE='TOGGLE_FAVORITE';
export const GET_CART_TABLE_DETAILS='GET_CART_TABLE_DETAILS';
export const MANAGE_CART_ITEMS='MANAGE_CART_ITEMS';
export const REMOVE_CART_ITEM='REMOVE_CART_ITEM';
export const ADD_CART_ITEM='ADD_CART_ITEM';
export const EMPTY_THE_CART='EMPTY_THE_CART';
//export const DECREASE_VALUE='DECREASE_VALUE';

export const getDishes=(items)=>{
    return{type:GET_DISHES_DATA,dishes:items};
}

export const getDishesKitchen=(kitName)=>{
    return {type:GET_DISHES_OF_KITCHEN,kitchen:kitName}
}

export const manageFavorites=(items)=>{
    return{type:MANAGE_FAVORITES,favItems:items};
}

export const toggleFavorite=(item)=>{
    return{type:TOGGLE_FAVORITE,dishId:item};
}

export const manageCartItems=(items)=>{
    return{type:MANAGE_CART_ITEMS,cartItems:items};
}

export const removeCartItem=(item)=>{
    return{type:REMOVE_CART_ITEM,cartItemId:item};
}

export const addCartItem=(item)=>{
    return{type:ADD_CART_ITEM,newItemId:item};
}

export const emptyTheCart=()=>{
    return{type:EMPTY_THE_CART}
}

export const getCartData=(items)=>{
    return{type:GET_CART_TABLE_DETAILS,cartData:items}
}


/*
export const decreaseValue=()=>{  
    return{type:DECREASE_VALUE};
}*/