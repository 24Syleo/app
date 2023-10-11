import AxiosService from '../services/AxiosService.jsx';
import { url_meteo, url_forecast, api_key } from '../config/config.jsx';

export const GET_DATA = "GET_DATA";
export const GET_FORECAST = "GET_FORECAST";

export const getMeteoData = (lat, lon) => {
    return async (dispatch) => {
        try{
            const data = await AxiosService.getAxiosService(url_meteo + `?lat=${lat}&lon=${lon}&APPID=` + api_key + '&units=metric');
            dispatch({type: GET_DATA, payload: data.data});
        }
        catch(error){
            return error;
        }
    }
}

export const getForecastData = (lat, lon) => {
    return async (dispatch) => {
        try{
            const data = await AxiosService.getAxiosService(url_forecast + `?lat=${lat}&lon=${lon}&APPID=` + api_key + '&units=metric');
            dispatch({type: GET_FORECAST, payload: data.data});
        }
        catch(error){
            return error;
        }
    }
}