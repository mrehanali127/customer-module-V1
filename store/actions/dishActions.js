export const GET_DISHES_DATA='GET_DISHES_DATA';
export const GET_KITCHENS_DATA='GET_KITCHENS_DATA';
export const GET_CHEF_DATA='GET_CHEF_DATA';
export const GET_RATING_DATA='GET_RATING_DATA';
export const GET_NUM_DISHES='GET_NUM_DISHES';
export const GET_CUSTOMER_DETAIL='GET_CUSTOMER_DETAIL';
export const GET_CATEGORICAL_DATA='GET_CATEGORICAL_DATA';
export const APPLY_CATEGORY='APPLY_CATEGORY';
export const GET_DISHES_OF_KITCHEN='GET_DISHES_OF_KITCHEN';
export const MANAGE_FAVORITES='MANAGE_FAVORITES';
export const TOGGLE_FAVORITE='TOGGLE_FAVORITE';
export const GET_CART_TABLE_DETAILS='GET_CART_TABLE_DETAILS';
export const MANAGE_CART_ITEMS='MANAGE_CART_ITEMS';
export const REMOVE_CART_ITEM='REMOVE_CART_ITEM';
export const ADD_CART_ITEM='ADD_CART_ITEM';
export const ADD_INTO_CART_TABLE='ADD_INTO_CART_TABLE';
export const REMOVE_FROM_CART_TABLE='REMOVE_FROM_CART_TABLE';
export const EMPTY_THE_CART='EMPTY_THE_CART';
export const EMPTY_THE_CART_TABLE='EMPTY_THE_CART_TABLE';
export const SEARCH_INPUT='SEARCH_INPUT';
export const GET_SELECTED_CUISINES='GET_SELECTED_CUISINES';
export const INCREASE_QUNATITY='INCREASE_QUNATITY';
export const DECREASE_QUNATITY='DECREASE_QUNATITY';
export const GET_CUSTOMER_ORDERS='GET_CUSTOMER_ORDERS';
export const UPDATE_ORDER_STATUS='UPDATE_ORDER_STATUS';

//export const DECREASE_VALUE='DECREASE_VALUE';

export const searchInput=(item)=>{
    return{type:SEARCH_INPUT,searchItem:item};
}

export const getDishes=(items)=>{
    return{type:GET_DISHES_DATA,dishes:items};
}

export const getCustomerDetail=(item)=>{
    return{type:GET_CUSTOMER_DETAIL,customer:item};
}

export const getCategoricalData=(items)=>{
    return{type:GET_CATEGORICAL_DATA,dishes:items};

}

export const getSelectedCuisines=(items)=>{
    return{type:GET_SELECTED_CUISINES,cuisines:items};
}

export const applyCategory=(items)=>{
    return{type:APPLY_CATEGORY,categoryItems:items};
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

export const addItemToCartTable=(item)=>{
    return{type:ADD_INTO_CART_TABLE,newItemData:item};
}

export const removeFromCartTable=(itemId)=>{
    return{type:REMOVE_FROM_CART_TABLE,removedItemId:itemId};
}

export const emptyTheCart=()=>{
    return{type:EMPTY_THE_CART};
}

export const emptyTheCartTable=()=>{
    return{type:EMPTY_THE_CART_TABLE};
}

export const getCartData=(items)=>{
    return{type:GET_CART_TABLE_DETAILS,cartData:items}
}

export const increaseQuantity=(item)=>{
    return{type:INCREASE_QUNATITY,cartItemId:item};
}

export const decreaseQuantity=(item)=>{
    return{type:DECREASE_QUNATITY,cartItemId:item};
}

export const getCustomerOrders=(items)=>{
    return{type:GET_CUSTOMER_ORDERS,orders:items};
}

export const getKitchensData=(items)=>{
    return{type:GET_KITCHENS_DATA,kitchens:items};
}

export const getChefsData=(items)=>{
    return{type:GET_CHEF_DATA,chefs:items};
}

export const getRatingData=(items)=>{
    return{type:GET_RATING_DATA,ratings:items};
}
export const getNumDishes=(items)=>{
    return{type:GET_NUM_DISHES,numDishes:items};
}


export const updateOrderStatus=(item,stat)=>{
    return{type:UPDATE_ORDER_STATUS,orderId:item,status:stat};
}



/*
export const decreaseValue=()=>{  
    return{type:DECREASE_VALUE};
}*/