import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getForecastData } from "../actions/MeteoController";
import { WiCloud, WiDaySunny , WiSnow, WiRain, WiBarometer, WiStrongWind, WiThermometer, WiHumidity} from "react-icons/wi";
import { Card } from 'flowbite-react';
import moment from "moment";
import { filter } from "lodash";

export const Forecast = () => {

    const dispatch      = useDispatch();
    const ipAdressData  = useSelector((state) => state.ipAdressReducer.data);
    const meteoForecast = useSelector((state) => state.meteoReducer.forecast);

    useEffect(() => {
        dispatch(getForecastData(ipAdressData.location.latitude ,ipAdressData.location.longitude))
    },[dispatch, getForecastData ])

    const getIcon = (value) => {
        switch(value) {
            case "Clouds":
                return WiCloud;
                break;
            case "Clear":
                return WiDaySunny;
                break;
            case "Rain":
                return WiRain;
            case "Snow":
                return WiSnow;
            default:
                return WiBarometer;
        }
    }

    const newForecast = useMemo(() => {
        if (meteoForecast && meteoForecast.list) {
            let filter_array = filter(
                meteoForecast.list, function(i){
                    return moment.unix(i.dt).hour() === 13;
                }
            )
            return filter_array;
        }
    }, [meteoForecast])

    console.log(newForecast);

    if (newForecast) {
        return(
            <div className="flex justify-around flex-wrap items-center mx-auto">
                {
                newForecast.map((elt,i) => (
                    <Card key={i}
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc={`./pics/${elt.weather[0].main}.png`}
                    className="m-2 p-1 bg-sky-100"
                    >
                        <h2 className="bold text-2xl">
                            {getIcon(elt.weather[0].main)}
                            {elt.weather[0].description}
                        </h2>
                        <p className="italic">
                            {moment.unix(elt.dt).format("LL")}
                        </p>
                        <div className="text-slate-600 flex flex-row justify-around items-center">
                            <WiThermometer/> {Math.trunc(elt.main.temp)} °C
                        </div>
                        <div className="text-slate-600 flex flex-row justify-around items-center">
                            <WiHumidity/> {elt.main.humidity}%
                            <WiStrongWind/> {elt.wind.speed} km/h
                        </div>
                    </Card>
                    ))
                }
            </div>
    )
    }
}