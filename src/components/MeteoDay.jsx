import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMeteoData } from "../actions/MeteoController";
import { Transition } from '@headlessui/react'

export const MeteoDay = ({children}) => {

    const dispatch     = useDispatch();
    const meteoData    = useSelector((state) => state.meteoReducer.data);
    const ipAdressData = useSelector((state) => state.ipAdressReducer.data);


    useEffect(() => {
            dispatch(getMeteoData(ipAdressData.location.latitude ,ipAdressData.location.longitude));
    }, [dispatch, getMeteoData])

    return(
        <Transition
            show      = {true}
            enter     = "transition-opacity duration-300"
            enterFrom = "opacity-0"
            enterTo   = "opacity-100"
            leave     = "transition-opacity duration-300"
            leaveFrom = "opacity-100"
            leaveTo   = "opacity-0"
            >
            <div className="flex justify-center content-center m-3">
                <img src={ meteoData.base ? `./pics/${meteoData.weather[0].main}.png` : './pics/search.png' } alt="image"/>
            </div>
            <div className="flex justify-center content-center m-3">
                <h2 className="text-white text-7xl bold">{ meteoData.base ? `${Math.trunc(meteoData.main.temp)}°C ` : 'X°C' }</h2>
            </div>
            <div className="flex justify-center content-center m-3">
                <h2 className="text-white text-7xl bold">{ meteoData.base ? `${meteoData.name} ` : 'Select a city°C' }</h2>
            </div>
            <div className="flex flex-row justify-around m-3">
                <div className="grid grid-cols-2 justify-items-center">
                    <div>
                        <img src="./pics/humidity.png" alt="humidity"/>
                    </div>
                    <div>
                        <p className="text-white text-4xl bold">{ meteoData.base ? `${meteoData.main.humidity}% ` : 'X%' }</p>
                        <p className="text-white text-base italic">humidity</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 justify-items-center">
                    <div>
                        <img src="./pics/wind.png" alt="humidity"/>
                    </div>
                    <div>
                        <p className="text-white text-4xl bold mx-0">{ meteoData.base ? `${meteoData.wind.speed}km/h ` : 'Xkm/h' }</p>
                        <p className="text-white text-base italic">speed</p>
                    </div>
                </div>
            </div>
        </Transition>
    );
}