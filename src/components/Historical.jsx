import React, { useRef, useState } from "react";
import { Card, Label, Select, RangeSlider, Button, TextInput } from "flowbite-react";
import { Transition } from '@headlessui/react'
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineCurrencyExchange, MdCalendarMonth } from "react-icons/md";
import { getHistoricalCurrency } from "../actions/CurrencyController";

export const Historical = () => {

    const listCurrency  = useSelector((state) => state.currencyReducer.currency);
    const resHistorical = useSelector((state) => state.currencyReducer.historical);

    const dispatch                  = useDispatch();
    const amountRef                 = useRef();
    const fromRef                   = useRef("");
    const toRef                     = useRef("");
    const dateRef                   = useRef();
    const toValue                   = toRef.current.value
    const [isShowing, setIsShowing] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const handlerHistorical = async (evt) => {
        evt.preventDefault();
        setIsPending(true);
        const amount = amountRef.current.value;
        const from   = fromRef.current.value;
        const to     = toRef.current.value;
        const date   = dateRef.current.value;

        dispatch(getHistoricalCurrency(date, from, to, amount));
        setIsShowing(true);
    }

    if (isPending && resHistorical) {
        setTimeout(() => {
            setIsPending(false)
        },500)
    }

    return (
        <Card>
            <h2 className="bold text-2xl">Historique</h2>
            <form onSubmit={handlerHistorical} className="flex flex-col items-start justify-around">
                <div className="block mb-3">
                    <Label htmlFor="amount">Montant</Label>
                    <RangeSlider id="amount" ref={amountRef} />
                </div>
                <div className="block mb-3">
                    <Label htmlFor="date">Date</Label>
                    <TextInput type="date" id="date" ref={dateRef} icon={MdCalendarMonth} min="2010-01-01"/>
                </div>
                <div className="block mb-3">
                    <Label htmlFor="from">De</Label>
                    <Select id="from" icon={MdOutlineCurrencyExchange} ref={fromRef}>
                        {
                            Object.entries(listCurrency.currencies).map(([k, v], i) => {
                                return (
                                    <option value={k} key={i}>{k} - {v}</option>
                                )
                            })
                        }
                    </Select>
                </div>
                <div className="block mb-3">
                    <Label htmlFor="to">Vers</Label>
                    <Select id="to" icon={MdOutlineCurrencyExchange} ref={toRef}>
                        {
                            Object.entries(listCurrency.currencies).map(([k, v], i) => {
                                return (
                                    <option value={k} key={i}>{k} - {v}</option>
                                )
                            })
                        }
                    </Select>
                </div>
                <Button isProcessing={isPending} gradientDuoTone="tealToLime" outline type="submit">
                    <p>
                        Comparer
                    </p>
                </Button>
            </form>
            <Transition
                show={isShowing}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-y-full"
                enterTo="translate-y-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-y-0"
                leaveTo="-translate-y-full"
            >
                {resHistorical && toValue && resHistorical.rates && resHistorical.rates[toValue] ? (
                <>
                    Pour un montant de {Math.round(resHistorical.amount)} {resHistorical.base_currency_code} <br />
                    Vous obteniez {resHistorical.rates[toValue].rate_for_amount} {resHistorical.rates[toValue].currency_name} <br />
                    Ratio de {resHistorical.rates[toValue].rate}
                </>
            ) : (
                ''
                )}
            </Transition>
        </Card>
    );
};