import AxiosService from '../services/AxiosService.jsx';
import { url_chuck, api_key_ninjas } from '../config/config.jsx';

export const GET_CHUCK = "GET_CHUCK";

const config = {
    headers:{
        'X-Api-Key': api_key_ninjas
    }
}

export const getChuckJoke = () => {
    return async (dispatch) => {
        try{
            const data = await AxiosService.getAxiosService(url_chuck, config);
            dispatch({type: GET_CHUCK, payload: data.data});
        }
        catch(error){
            return error;
        }
    }
}