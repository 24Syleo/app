import { GET_CHUCK } from "../actions/NinjasController";

const initialState = {
    data:[]
}

export default function ninjasReducer(state = initialState, action){
    switch(action.type){
        case GET_CHUCK:
            return {
                ...state,
                data:action.payload
            }
        default:
            return state;
    }
}