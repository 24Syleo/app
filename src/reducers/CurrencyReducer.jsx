import { GET_LIST_CURRENCY, GET_CONVERT, GET_HISTORICAL } from "../actions/CurrencyController";

const initialState = {
    currency  : [],
    convert   : [],
    historical: []
}

export default function currencyReducer(state = initialState, action){
    switch(action.type){
        case GET_LIST_CURRENCY:
            return {
                ...state,
                currency: action.payload
            }
        case GET_CONVERT:
            return {
                ...state,
                convert: action.payload
            }
        case GET_HISTORICAL:
            return {
                ...state,
                historical: action.payload
            }
        default:
            return state;
    }
}