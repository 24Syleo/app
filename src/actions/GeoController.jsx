import AxiosService from '../services/AxiosService.jsx';
import { url_geo, api_key } from '../config/config.jsx';

export const GET_GEO = "GET_GEO";

export const getGeoData = (city) => {
    return async (dispatch) => {
        try{
            const data = await AxiosService.getAxiosService(url_geo + `?q=${city}&limit=1&APPID=` + api_key);
            dispatch({type: GET_GEO, payload: data.data});
        }
        catch(error){
            return error;
        }
    }
}