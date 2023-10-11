import { GET_IP } from "../actions/IpAdressController";

const initialState = {
    data:[]
}

export default function ipAdressReducer(state = initialState, action){
    switch(action.type){
        case GET_IP:
            return {
                ...state,
                data:action.payload
            }
        default:
            return state;
    }
}