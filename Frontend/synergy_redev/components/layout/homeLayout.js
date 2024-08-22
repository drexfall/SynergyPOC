import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faChevronDown, faGears,
    faHome, faUser,
    faUsers,
    faWindowMaximize,
    faWindowRestore
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../../Assets/Images/Logo.png';
import Image from "next/image";


const Layout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="fixed w-full h-16 z-30 border-b border-gray-200 dark:border-gray-600 bg-indigo-200 dark:bg-gray-800">
                <div className=" flex flex-wrap items-center justify-between py-3 px-4">
                    <div></div>
                    <button data-collapse-toggle="navbar-solid-bg" type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-solid-bg" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                        <ul id={'nav-links'} className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                            <li>
                                <a href="#"
                                    className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
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
                   className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-sky-900 bg-opacity-95 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                   aria-label="Sidebar">
                <div className={'h-16 bg-indigo-100 px-4 py-1 flex justify-between items-center'}>
                    <a className={'w-6 text-sky-900'}>
                        <FontAwesomeIcon icon={faBars} />
                    </a>
                    <Image
                        src={Logo}
                        alt="Logo"
                        width={100}
                        className="max-w-full h-auto"
                    />
                </div>
                <div className="h-full px-3 py-4 overflow-y-auto">

                    <ul className="space-y-1">
                        <li>
                            <a href="#"
                               className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2  text-gray-700">
                                <FontAwesomeIcon icon={faHome} className={'w-5'} />
                                <span className="text-sm font-medium"> Dashboard </span>
                            </a>
                        </li>

                        <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary
                                    className="group flex items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faUsers} className={'w-5'} />
                                        <span className="text-sm font-medium"> Users </span>
                                    </div>

                                    <span className="shrink-0 transition duration-300 w-3 group-open:-rotate-180">
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </span>
                                </summary>

                                <ul className="mt-2 space-y-1 px-4">
                                    <li>
                                        <a
                                            href="#"
                                            className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
                                        >
                                            Banned Users
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="#"
                                            className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
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
                                className="flex items-center gap-2 rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700"
                            >
                                <FontAwesomeIcon icon={faWindowMaximize} className={'w-5'} />
                                <span className="text-sm font-medium"> Portal </span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="flex items-center gap-2 rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700"
                            >
                                <FontAwesomeIcon icon={faWindowRestore} className={'w-5'} />
                                <span className="text-sm font-medium"> Templates </span>
                            </a>
                        </li>

                        <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary
                                    className="group flex items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faGears} className={'w-5'} />
                                        <span className="text-sm font-medium"> Admin </span>
                                    </div>

                                    <span className="shrink-0 w-3 transition duration-300 group-open:-rotate-180">
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </span>
                                </summary>

                                <ul className="mt-2 space-y-1 px-4">
                                    <li>
                                        <a
                                            href="#"
                                            className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
                                        >
                                            Details
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="#"
                                            className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700"
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
            <main className={'pt-14 pl-64'}>
                {children}
            </main>


            <footer
                className="ml-64 bottom-0 left-0 z-50 p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">&copy; 2024 <a href="#"
                    className="hover:underline">Synergy</a>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </footer>

        </>
    );
};

export default Layout;
