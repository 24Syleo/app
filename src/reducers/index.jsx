import { combineReducers } from 'redux';
import meteoReducer from './MeteoReducers';
import geoReducer from './GeoReducers';
import ipAdressReducer from './IpAdressReducer';
import currencyReducer from './CurrencyReducer';
import ninjasReducer from './NinjaReducer';

export default combineReducers({
    meteoReducer,
    geoReducer,
    ipAdressReducer,
    currencyReducer,
    ninjasReducer
});