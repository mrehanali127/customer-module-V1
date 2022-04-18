import { GET_DISHES_DATA,GET_DISHES_OF_KITCHEN,
    MANAGE_CART_ITEMS,MANAGE_FAVORITES,
    TOGGLE_FAVORITE,REMOVE_CART_ITEM,
    ADD_CART_ITEM,EMPTY_THE_CART,EMPTY_THE_CART_TABLE,
    GET_CART_TABLE_DETAILS,
    GET_CATEGORICAL_DATA,APPLY_CATEGORY,
    SEARCH_INPUT,GET_SELECTED_CUISINES,
    ADD_INTO_CART_TABLE,REMOVE_FROM_CART_TABLE,
    INCREASE_QUNATITY,DECREASE_QUNATITY,
    GET_CUSTOMER_DETAIL,GET_CUSTOMER_ORDERS,UPDATE_ORDER_STATUS
 } from "../actions/dishActions";

import IP from "../../constants/IP";



const initialState={
    Dishes: [],
    favoritesIds:[],
    cartItems:[],
    customerDetails:{},
    cartTableData:[],
    categoricalDishes:[],
    searchInput:'',
    selectedCuisines:[],
    CustomerOrders:[],
}

const dishReducer=(state=initialState,action)=>{
    switch(action.type){
        case SEARCH_INPUT:
            return{...state,searchInput:action.searchItem};

        case GET_DISHES_DATA:
          return {...state,Dishes:action.dishes};
        
          case GET_CUSTOMER_DETAIL:
            return {...state,customerDetails:action.customer};
          

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
        case ADD_INTO_CART_TABLE:
            return {...state,cartTableData:state.cartTableData.concat(action.newItemData)};
        
        case REMOVE_FROM_CART_TABLE:
            const indexCartTable=state.cartTableData.findIndex(item=>item.dish_id===action.removedItemId);
            const updateCartTable=[...state.cartTableData];
            updateCartTable.splice(indexCartTable,1);
            return{...state,cartTableData:updateCartTable};
        
        case REMOVE_CART_ITEM:
            const indexItem=state.cartItems.findIndex(dish=>dish.dish_id===action.cartItemId);
            const updateCart=[...state.cartItems];
            updateCart.splice(indexItem,1);
            return{...state,cartItems:updateCart};
        case EMPTY_THE_CART:
            return{...state,cartItems:[]};
        
        case EMPTY_THE_CART_TABLE:
            return{...state,cartTableData:[]};

        case INCREASE_QUNATITY:
            const ifSelected=state.cartTableData.findIndex(dish=>dish.dish_id===action.cartItemId);
                if(ifSelected>=0){
                    let selectedDish=state.cartTableData[ifSelected];
                    selectedDish.quantity=selectedDish.quantity+1;
                    const itemSelectedFromCart=state.cartItems.find(dish=>dish.dish_id===action.cartItemId);
                    selectedDish.total_amount=itemSelectedFromCart.price*selectedDish.quantity;
                    console.log('/\\\\\\\\\\\\ Incrmented Dish \\\\\\\\/');
                    console.log(selectedDish);
                    const cartData=[...state.cartTableData];
                    cartData.splice(ifSelected, 1,selectedDish);
                    console.log('/\\\\\\\\\\\\ incremented Cart Data \\\\\\\\/');
                    console.log(cartData);
                    return {...state,cartTableData:cartData};
                };
        case DECREASE_QUNATITY:
                const ifSelectedDec=state.cartTableData.findIndex(dish=>dish.dish_id===action.cartItemId);
                    if(ifSelectedDec>=0){
                            let selectedDishDec=state.cartTableData[ifSelectedDec];
                            if(selectedDishDec.quantity<=1){
                                return state;
                            }
                            selectedDishDec.quantity=selectedDishDec.quantity-1;
                            const itemSelectedFromCartDec=state.cartItems.find(dish=>dish.dish_id===action.cartItemId);
                            selectedDishDec.total_amount=itemSelectedFromCartDec.price*selectedDishDec.quantity;
                            console.log('/\\\\\\\\\\\\ decremented Dish \\\\\\\\/');
                            console.log(selectedDishDec);
                            const cartDataDec=[...state.cartTableData];
                            cartDataDec.splice(ifSelectedDec, 1,selectedDishDec);
                            console.log('/\\\\\\\\\\\\ decremented Cart Data \\\\\\\\/');
                            console.log(cartDataDec);
                            return {...state,cartTableData:cartDataDec};
                    }
        case GET_CUSTOMER_ORDERS:
            return {...state,CustomerOrders:action.orders};
                      
        case UPDATE_ORDER_STATUS:
                const ifSelectedOrder=state.CustomerOrders.findIndex(order=>order.order_id===action.orderId);
                    if(ifSelectedOrder>=0){
                        let selectedOrder=state.CustomerOrders[ifSelectedOrder];
                        selectedOrder.status=action.status;
                        const ordersData=[...state.CustomerOrders];
                        ordersData.splice(ifSelectedOrder, 1,selectedOrder);
                        return {...state,CustomerOrders:ordersData};
                    };
                return state;
        default:
            return state;    
    }
    //return state;
  
}

export default dishReducer;