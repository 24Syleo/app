import React, { useRef, useState } from "react";
import { Card, Label, Select, RangeSlider, Button } from "flowbite-react";
import { Transition } from '@headlessui/react'
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { getConvertCurrency } from "../actions/CurrencyController";
import moment from "moment";

export const Convert = () => {

    const listCurrency = useSelector((state) => state.currencyReducer.currency);
    const resConvert   = useSelector((state) => state.currencyReducer.convert);

    const dispatch                  = useDispatch();
    const amountRef                 = useRef();
    const fromRef                   = useRef("");
    const toRef                     = useRef("");
    const toValue                   = toRef.current.value
    const [isShowing, setIsShowing] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const handlerConverter = async (evt) => {
        evt.preventDefault();
        setIsPending(true);
        const amount = amountRef.current.value;
        const from   = fromRef.current.value;
        const to     = toRef.current.value;

        dispatch(getConvertCurrency(from, to, amount));
        setIsShowing(true);
    }

    if (isPending && resConvert) {
        setTimeout(() => {
            setIsPending(false);
        }, 400);
    }

    return (
        <Card>
            <h2 className="bold text-2xl">Convertisseur</h2>
            <form onSubmit={handlerConverter} className="flex flex-col items-start justify-around">
                <div className="block mb-3">
                    <Label htmlFor="amount">Montant</Label>
                    <RangeSlider id="amount" ref={amountRef} />
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
                <Button isProcessing={isPending} gradientDuoTone="greenToBlue" outline type="submit">
                    <p>
                        Convertir
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
                {resConvert && toValue && resConvert.rates && resConvert.rates[toValue] ? (
                    <>
                        Pour un montant de {Math.round(resConvert.amount)} {resConvert.base_currency_code} <br />
                        Vous obtenez {resConvert.rates[toValue].rate_for_amount} {resConvert.rates[toValue].currency_name} <br />
                        Ratio de {resConvert.rates[toValue].rate}
                    </>
                ) : (
                    ''
                )}
            </Transition>
        </Card>
    );
};