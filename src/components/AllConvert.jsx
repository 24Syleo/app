import React from "react";
import { Tabs, Card } from 'flowbite-react';
import { BsCurrencyExchange, BsClockHistory } from 'react-icons/bs'; 


export const AllConvert = ({tabOne, tabTwo}) => {

    return (
        <div className="h-screen flex justify-center align-center bg-gradient-to-r from-green-500 from-10% via-jade-500 via-30% to-yellow-200 to-90% py-2 items-center">
            <Card>
                <Tabs.Group style="underline">
                    <Tabs.Item icon={BsCurrencyExchange} title="Convertisseur">
                        {tabOne}
                    </Tabs.Item>
                    <Tabs.Item icon={BsClockHistory} title="Historique">
                        {tabTwo}
                    </Tabs.Item>
                </Tabs.Group>
            </Card>
        </div>
    );
};