import AxiosService from '../services/AxiosService.jsx';
import { url_currency, api_key_geo, url_convert, url_historical } from '../config/config.jsx';

export const GET_LIST_CURRENCY = "GET_LIST_CURRENCY";
export const GET_CONVERT       = "GET_CONVERT";
export const GET_HISTORICAL    = "GET_HISTORICAL";

export const getListCurrency = () => {
    return async (dispatch) => {
        try{
            const data = await AxiosService.getAxiosService(url_currency + api_key_geo + '&format=json');
            dispatch({type: GET_LIST_CURRENCY, payload: data.data});
        }
        catch(error){
            return error;
        }
    }
}

export const getConvertCurrency = (from, to, amount) => {
    return async (dispatch) => {
        try{
            const data = await AxiosService.getAxiosService(url_convert + api_key_geo + `&from=${from}&to=${to}&amount=${amount}&format=json`);
            dispatch({type: GET_CONVERT, payload: data.data});
        }
        catch(error){
            return error;
        }
    }
}

export const getHistoricalCurrency = (date, from, to, amount) => {
    return async (dispatch) => {
        try{
            const data = await AxiosService.getAxiosService(url_historical + date + '?api_key=' + api_key_geo + `&from=${from}&to=${to}&amount=${amount}&format=json`);
            dispatch({type: GET_HISTORICAL, payload: data.data});
        }
        catch(error){
            return error;
        }
    }
}