import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Menu } from "./components/Menu";
import { Meteo } from "./components/Meteo";
import { Convert } from "./components/Convert";
import { AllConvert } from "./components/AllConvert";
import { Historical } from "./components/Historical";
import { Forecast } from "./components/Forecast";
import { MeteoDay } from "./components/MeteoDay";

function App() {

    return (
        <BrowserRouter>
            <div className="h-screen flex sm:flex-row flex-col">
                <div className="justify-stretch">
                    <Menu/>
                </div>
                <div className="justify-stretch w-full">
                <Routes>
                    <Route path="/" element={<Meteo today={<MeteoDay/>} futur={<Forecast/>}/>} />
                    <Route path="/convert" element={<AllConvert tabOne={<Convert/>} tabTwo={<Historical/>}/>} />
                </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
