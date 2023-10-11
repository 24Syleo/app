import AxiosService from '../services/AxiosService.jsx';
import { url_ip, api_key_geo } from '../config/config.jsx';

export const GET_IP = "GET_IP";

export const getIpData = () => {
    return async (dispatch) => {
        try{
            const data = await AxiosService.getAxiosService(url_ip + api_key_geo + '&format=json');
            dispatch({type: GET_IP, payload: data.data});
        }
        catch(error){
            return error;
        }
    }
}