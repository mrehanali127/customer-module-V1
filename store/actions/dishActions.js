export const GET_DISHES_DATA='GET_DISHES_DATA';
export const GET_DISHES_OF_KITCHEN='GET_DISHES_OF_KITCHEN';
//export const DECREASE_VALUE='DECREASE_VALUE';

export const getDishes=(items)=>{
    return{type:GET_DISHES_DATA,dishes:items};
}

export const getDishesKitchen=(kitName)=>{
    return {type:GET_DISHES_OF_KITCHEN,kitchen:kitName}
}


/*
export const decreaseValue=()=>{  
    return{type:DECREASE_VALUE};
}*/