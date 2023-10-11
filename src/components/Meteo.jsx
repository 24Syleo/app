import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMeteoData, getForecastData } from "../actions/MeteoController";
import { getGeoData } from "../actions/GeoController";
import { TextInput, Button } from 'flowbite-react';

export const Meteo = ({today, futur}) => {

    const dispatch                  = useDispatch();
    const geoData                   = useSelector((state) => state.geoReducer.data);
    const cityRef                   = useRef("");
    const [isPending, setIsPending] = useState(false);

    const handlerCity = async (evt) => {
        evt.preventDefault();
        setIsPending(true);
        const city = cityRef.current.value;

        dispatch(getGeoData(city));
    }

    useEffect(() => {
        if(geoData.length > 0){

            const lat = geoData[0].lat;
            const lon = geoData[0].lon;
            
            dispatch(getMeteoData(lat, lon));
            dispatch(getForecastData(lat, lon));
        }
    }, [dispatch, geoData])

    if (isPending && geoData.length > 0) {
        setTimeout(() => {
            setIsPending(false);
        }, 400);
    }

    return(
        <div className="h-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-blue-200 to-90%">
            <div className="flex flex-col bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-blue-200 to-90% p-2 items-center">
                <form onSubmit={handlerCity} className="m-3">
                    <div className="flex flex-row justify-center">
                        <TextInput required placeholder="search city" id="city" ref={cityRef} sizing="md" type="text" className="mr-3"/>
                        <Button isProcessing={isPending} type="submit" gradientDuoTone="redToYellow"> search </Button>
                    </div>
                </form>
                <div>
                    {today}
                </div>
            </div>
            <div className="flex justify-around items-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-blue-200 to-90% w-full px-2">
                {futur}
            </div>
        </div>
    );
}