import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faBars,
  faChevronDown,
  faGears,
  faHome,
  faTable,
  faWindowMaximize,
  faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const Layout = ({ children, sidebar = true }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [userName, setUserName] = useState(null);
  var router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    !sidebar ? setIsMenuOpen(sidebar) : null;
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const response = await axios.get("/api/user");
      var user = response.data;
      console.log(user);
      if (user) {
        setUserName(user.Name);
      } else {
        setUserName(null);
      }
    } catch (error) {
      console.error("Error checking user:", error);
      setUserName(null);
    }
  };

  const logout = async () => {
    const response = await axios.delete("/api/delete");
    if (response.status === 200) {
      await router.push("/Login");
    }
  };
  return (
    <>
      <nav className="fixed w-full h-16 z-30 shadow dark:shadow-2xl bg-white dark:bg-gray-800">
        <div className=" flex flex-wrap justify-between items-center py-3 px-4">
          <div className={"flex gap-4 "}>
            <button
              data-collapse-toggle="navbar-solid-bg"
              type="button"
              className="p-2 text-sm text-indigo-900 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-solid-bg"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon className={"size-4"} icon={faBars} />
            </button>
            <div className={"flex justify-start gap-4 items-center"}>
              <p
                className={
                  "font-semibold text-2xl  text-indigo-950 dark:text-indigo-100"
                }
              >
                Synergy
              </p>
            </div>
          </div>
          <div
            className="hidden w-full md:block md:w-auto mt-2"
            id="navbar-solid-bg"
          >
            <ul
              id={"nav-links"}
              className="flex flex-col items-center font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700"
            >
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-indigo-900 md:font-bold md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Contact
                </a>
              </li>
              <li>
                {userName ? (
                  <span
                    onClick={toggleDropdown}
                    className="rounded-md bg-indigo-600 hover:bg-indigo-800 cursor-pointer px-3 py-2 text-sm font-semibold text-white shadow-sm"
                  >
                    {userName}
                  </span>
                ) : (
                  <Link
                    href="/Login"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Login
                  </Link>
                )}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20">
                    <button
                      type={"button"}
                      className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Profile
                    </button>
                    <button
                      type={"button"}
                      className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`${isMenuOpen ? "block" : "hidden"} fixed top-16 left-0 z-20 w-64 p-4 h-screen transition-transform -translate-x-full bg-indigo-950 dark:bg-gray-900  bg-opacity-95 sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="p-4 mb-4 overflow-y-auto bg-indigo-950 bg-opacity-90 dark:bg-gray-950 rounded shadow-lg">
          <ul className="space-y-1">
            <li>
              <a
                href="#"
                className="flex items-center gap-4 rounded bg-indigo-200 px-4 py-2 text-indigo-950"
              >
                <FontAwesomeIcon icon={faHome} className={"w-4"} />
                <span className="text-sm font-medium"> Dashboard </span>
              </a>
            </li>

            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="group flex cursor-pointer items-center justify-between rounded px-4 py-2 text-white transition-all hover:bg-indigo-200 hover:text-indigo-950">
                  <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faWindowRestore} className={"w-4"} />
                    <span className="text-sm font-medium"> Template </span>
                  </div>

                  <span className="w-3 shrink-0 transition duration-300 group-open:-rotate-180">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <Link
                      href="/form/dashboard"
                      className={
                        "flex items-center gap-2 rounded px-4 py-2 text-white transition-all hover:bg-indigo-200 hover:text-indigo-950"
                      }
                    >
                      <FontAwesomeIcon icon={faTable} className={"w-4"} />
                      <span className="text-sm font-medium"> Form </span>
                    </Link>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center gap-4 rounded px-4 py-2 text-white transition-all hover:bg-indigo-200 hover:text-indigo-950"
              >
                <FontAwesomeIcon icon={faWindowMaximize} className={"w-4"} />
                <span className="text-sm font-medium"> Portal </span>
              </a>
            </li>

            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="group flex cursor-pointer items-center justify-between rounded px-4 py-2 text-white transition-all hover:bg-indigo-200 hover:text-indigo-950">
                  <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faUser} className={"w-4"} />
                    <span className="text-sm font-medium"> User </span>
                  </div>

                  <span className="w-3 shrink-0 transition duration-300 group-open:-rotate-180">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <a
                      href="#"
                      className="block rounded px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-200 hover:text-indigo-950"
                    >
                      Banned Users
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="block rounded px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-200 hover:text-indigo-950"
                    >
                      Calendar
                    </a>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="group flex items-center justify-between rounded-lg px-4 py-2 text-white transition-all hover:bg-indigo-200 hover:text-indigo-950">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faGears} className={"w-5"} />
                    <span className="text-sm font-medium"> Admin </span>
                  </div>

                  <span className="w-3 shrink-0 transition duration-300 group-open:-rotate-180">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <a
                      href="#"
                      className="block rounded px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-200 hover:text-indigo-950"
                    >
                      Details
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="block rounded px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-200 hover:text-indigo-950"
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
      <main className={`pt-16 ${isMenuOpen && "pl-64"} ${styles.body}`}>
        {children}
      </main>

      <footer className="bottom-0 z-50 w-full bg-indigo-950 p-4 shadow md:flex md:items-center md:justify-center md:p-6 dark:border-gray-600 dark:bg-gray-800">
        <span className="text-sm text-indigo-50 text-opacity-80 sm:text-center dark:text-gray-400">
          &copy; 2024{" "}
          <a href="#" className="hover:underline">
            Synergy
          </a>
          . All Rights Reserved.
        </span>
      </footer>
    </>
  );
};

export default Layout;
