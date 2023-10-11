import { GET_DATA, GET_FORECAST } from "../actions/MeteoController";

const initialState = {
    data:[],
    forecast: []
}

export default function meteoReducer(state = initialState, action){
    switch(action.type){
        case GET_DATA:
            return {
                ...state,
                data:action.payload
            }
        case GET_FORECAST:
            return {
                ...state,
                forecast: action.payload
            }
        default:
            return state;
    }
}