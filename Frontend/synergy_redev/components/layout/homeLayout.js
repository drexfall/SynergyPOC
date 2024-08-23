import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAdd,
    faBars,
    faChevronDown, faGears,
    faHome,
    faTable,
    // faUser,
    // faUsers,
    faWindowMaximize,
    faWindowRestore
} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons'
import Logo from '../../Assets/Images/Logo.png';
import Image from "next/image";
import styles from '../../styles/Home.module.css'
import Link from "next/link";


const Layout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="bg-white fixed w-full h-16 z-30 shadow dark:shadow-2xl bg-indigo-850 dark:bg-gray-800">
                <div className=" flex flex-wrap justify-between items-center py-3 px-4">

                    <div className={"flex gap-4 "}>
                        <button data-collapse-toggle="navbar-solid-bg" type="button"
                                className="p-2 text-sm text-indigo-900 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="navbar-solid-bg" aria-expanded="false">
                            <FontAwesomeIcon className={"size-4"} icon={faBars}/>
                        </button>
                        <div
                            className={'flex justify-start gap-4 items-center'}>
                            <p className={"font-semibold text-2xl  text-indigo-950 dark:text-indigo-100"}>Synergy</p>
                        </div>
                    </div>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">

                        <ul id={'nav-links'}
                            className="flex flex-col items-center font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                            <li>
                                <a href="#"
                                   className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-indigo-900 md:font-bold md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                                   aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#"
                                   className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
                            </li>
                            <li>
                                <a href="#"
                                   className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
                            </li>
                            <li>
                                <a href="#"
                                   className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
                            </li>
                            <li>
                                <button type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            <aside id="logo-sidebar"
                   className="fixed top-16 left-0 z-20 w-64 p-4 h-screen transition-transform -translate-x-full bg-indigo-950 dark:bg-gray-900  bg-opacity-95 sm:translate-x-0"
                   aria-label="Sidebar">

                <div className="p-4 mb-4 overflow-y-auto bg-indigo-950 bg-opacity-90 dark:bg-gray-950 rounded shadow-lg">

                    <ul className="space-y-1">
                        <li>
                            <a href="#"
                               className="flex items-center gap-4 rounded bg-indigo-200 px-4 py-2 text-indigo-950">
                                <FontAwesomeIcon icon={faHome} className={'w-4'} />
                                <span className="text-sm font-medium"> Dashboard </span>
                            </a>
                        </li>

                        <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary
                                    className="group cursor-pointer flex items-center justify-between rounded px-4 py-2 text-white hover:bg-indigo-200 hover:text-indigo-950 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <FontAwesomeIcon icon={faUser} className={'w-4'} />
                                        <span className="text-sm font-medium"> User </span>
                                    </div>

                                    <span className="shrink-0 transition duration-300 w-3 group-open:-rotate-180">
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </span>
                                </summary>

                                <ul className="mt-2 space-y-1 px-4">
                                    <li>
                                        <a
                                            href="#"
                                            className="block rounded px-4 py-2 text-sm font-medium text-white hover:bg-indigo-200 hover:text-indigo-950 transition-all"
                                        >
                                            Banned Users
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="#"
                                            className="block rounded px-4 py-2 text-sm font-medium text-white hover:bg-indigo-200 hover:text-indigo-950 transition-all"
                                        >
                                            Calendar
                                        </a>
                                    </li>
                                </ul>
                            </details>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="flex items-center gap-4 rounded px-4 py-2 text-white hover:bg-indigo-200 hover:text-indigo-950 transition-all"
                            >
                                <FontAwesomeIcon icon={faWindowMaximize} className={'w-4'} />
                                <span className="text-sm font-medium"> Portal </span>
                            </a>
                        </li>

                        <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary
                                    className="group cursor-pointer flex items-center justify-between rounded px-4 py-2 text-white hover:bg-indigo-200 hover:text-indigo-950 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <FontAwesomeIcon icon={faWindowRestore} className={'w-4'}/>
                                        <span className="text-sm font-medium"> Template </span>
                                    </div>

                                    <span className="shrink-0 w-3 transition duration-300 group-open:-rotate-180">
                                        <FontAwesomeIcon icon={faChevronDown}/>
                                    </span>
                                </summary>

                                <ul className="mt-2 space-y-1 px-4">
                                    <li>
                                        <Link href="/form/create"
                                              className={"flex items-center gap-2 rounded-lg px-4 py-2 text-white hover:bg-indigo-200 hover:text-indigo-950 transition-all"}>
                                            <FontAwesomeIcon icon={faAdd} className={'w-4'}/>
                                            <span className="text-sm font-medium"> Create </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/form/dashboard"
                                              className={"flex items-center gap-2 rounded-lg px-4 py-2 text-white hover:bg-indigo-200 hover:text-indigo-950 transition-all"}>
                                            <FontAwesomeIcon icon={faTable} className={'w-4'}/>
                                            <span className="text-sm font-medium"> Dashboard </span>
                                        </Link>
                                    </li>


                                </ul>
                            </details>

                        </li>

                        <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary
                                    className="group flex items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-indigo-200 hover:text-indigo-950 transition-all"
                                >
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faGears} className={'w-5'}/>
                                        <span className="text-sm font-medium"> Admin </span>
                                    </div>

                                    <span className="shrink-0 w-3 transition duration-300 group-open:-rotate-180">
                                        <FontAwesomeIcon icon={faChevronDown}/>
                                    </span>
                                </summary>

                                <ul className="mt-2 space-y-1 px-4">
                                    <li>
                                        <a
                                            href="#"
                                            className="block rounded px-4 py-2 text-sm font-medium text-white hover:bg-indigo-200 hover:text-indigo-950 transition-all"
                                        >
                                            Details
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="#"
                                            className="block rounded px-4 py-2 text-sm font-medium text-white hover:bg-indigo-200 hover:text-indigo-950 transition-all"
                                        >
                                            Security
                                        </a>
                                    </li>

                                    <li>
                                        <form action="#">
                                            <button
                                                type="submit"
                                                className="w-full rounded-lg px-4 py-2 text-sm font-medium text-white [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                                            >
                                                Logout
                                            </button>
                                        </form>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>

                </div>
            </aside>
            <main className={`pt-14 pl-64 ${styles.body}`}>
                {children}
            </main>


            <footer
                className="sticky w-full z-50 p-4 bg-indigo-950 shadow md:flex md:items-center md:justify-center md:p-6 dark:bg-gray-800 dark:border-gray-600">
                <span className="text-sm text-indigo-50 text-opacity-80 sm:text-center dark:text-gray-400">&copy; 2024 <a href="#"
                    className="hover:underline">Synergy</a>. All Rights Reserved.
                </span>

            </footer>

        </>
    );
};

export default Layout;
