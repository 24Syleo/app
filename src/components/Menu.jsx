import React, { useState } from "react";
import { Sidebar, Button, Badge, Navbar, Dropdown } from "flowbite-react";
import { BiCameraMovie, BiCloud, BiMoney, BiCalendar, BiSolidMicrophoneAlt } from "react-icons/bi";
import { IoIosClose } from "react-icons/io"
import moment from "moment";
import { Transition } from '@headlessui/react'
import { useDispatch, useSelector } from "react-redux";
import { getChuckJoke } from "../actions/NinjasController";

export const Menu = () => {

    const today = moment().format("dddd, ll");
    const joke  = useSelector((state) => state.ninjasReducer.data);

    const dispatch                  = useDispatch();
    const [isShowing, setIsShowing] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const handlerJoke = () => {
        setIsPending(true)
        dispatch(getChuckJoke());
        setIsShowing(true);
    }

    if (isPending && joke.joke) {
        setTimeout(() => {
            setIsPending(false);
        }, 400);
    }

    return (
        <>
            <div className="block sm:hidden">
                <Navbar
                    fluid
                    rounded>
                    <Navbar.Brand>
                        <img className="mr-3 h-6 sm:h-9"
                            src="./pics/logo.jpg" />
                        <span>
                            Syleo 24
                        </span>
                    </Navbar.Brand>
                    <div className="flex">
                        <Dropdown label="Choisis une App" gradientMonochrome="cyan">
                            <Dropdown.Item as="a" href="/" icon={BiCloud}>
                                App Meteo
                            </Dropdown.Item>
                            <Dropdown.Item as="a" href="/convert" icon={BiMoney}>
                                Convertisseur
                            </Dropdown.Item>
                            <Dropdown.Item as="a" href="#" icon={BiCameraMovie}>
                                App movie
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                </Navbar >
            </div >
            <div className="sm:block hidden">
                <Sidebar>
                    <Sidebar.Logo
                        href="/"
                        img="./pics/logo.jpg"
                        imgAlt="logo"
                    >
                        <p>
                            Syleo 24
                        </p>
                    </Sidebar.Logo>
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href="/" icon={BiCloud}>
                                <p>
                                    App Meteo
                                </p>
                            </Sidebar.Item>
                            <Sidebar.Item href="/convert" icon={BiMoney}>
                                <p>
                                    App convertisseur
                                </p>
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={BiCameraMovie}>
                                <p>
                                    App Film
                                </p>
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item icon={BiCalendar}>
                                <p className="flex flex-wrap">
                                    {today}
                                </p>
                            </Sidebar.Item>
                            <Sidebar.Item icon={BiSolidMicrophoneAlt}>
                                <Button isProcessing={isPending} gradientDuoTone="purpleToBlue" size="sm" type="button" onClick={handlerJoke}>
                                    Norris Joke!
                                </Button>
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                    <Transition
                        show={isShowing}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Sidebar.CTA>
                            <div className="mb-3 flex Dropdown.Items-center justify-between">
                                <Badge color="purple">
                                    Joke
                                </Badge>
                                <Button color="default" onClick={() => setIsShowing(false)}>
                                    <IoIosClose className="text-2xl text-pink-700" />
                                </Button>
                            </div>
                            <div>
                                <p>
                                    {joke?.joke}
                                </p>
                            </div>
                        </Sidebar.CTA>
                    </Transition>
                </Sidebar>
            </div>
        </>
    )
}