import { GET_GEO } from "../actions/GeoController";

const initialState = {
    data:[]
}

export default function geoReducer(state = initialState, action){
    switch(action.type){
        case GET_GEO:
            return {
                ...state,
                data:action.payload
            }
        default:
            return state;
    }
}