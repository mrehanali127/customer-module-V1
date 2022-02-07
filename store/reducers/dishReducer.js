import { GET_DISHES_DATA,GET_DISHES_OF_KITCHEN } from "../actions/dishActions";

import IP from "../../constants/IP";




const initialState={
    Dishes: []
}

const dishReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_DISHES_DATA:
          return {...state,Dishes:state.Dishes.concat(action.dishes)}
        case GET_DISHES_OF_KITCHEN:
            return state
        default:
            return state;    
    }
    //return state;
  
}

export default dishReducer;