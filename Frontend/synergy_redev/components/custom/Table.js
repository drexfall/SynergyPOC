import { ContextMenu } from "../ContextMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faChevronLeft,
  faChevronRight,
  faClose,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { CheckBox } from "../FormIO/form";
import Button from "./Button";

export default function Table({
  data,
  columns = [],
  pageLimit = 10,
  actions = [
    {
      label: "Add here",
      icon: faPencil,
      onClick: () => {
        console.log("Button pressed");
      },
    },
  ],
  ...props
}) {
  const [fetchedData, setFetchedData] = useState(data);
  const [pageData, setPageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selection, setSelection] = useState(false);
  const contextMenu = useRef();
  useEffect(() => {
    document.addEventListener("click", (event) => {
      hideContextMenu();
    });
    document.addEventListener("blur", (event) => {
      hideContextMenu();
    });
    if (!data) {
      setFetchedData(null);
      setLoading(false);
      return;
    }
    if (typeof data.source === "string") {
      axios.get(data.source).then((res) => {
        if (Array.isArray(res.data)) {
          setFetchedData(res.data);
          setLoading(false);
        }
      });
    }
  }, []);

  useEffect(() => {
    let _data = [],
      lowerLimit = (currentPage - 1) * pageLimit,
      upperLimit = pageLimit + (currentPage - 1) * pageLimit;
    if (Array.isArray(fetchedData)) {
      for (let i = lowerLimit; i < upperLimit; i++) {
        _data.push(fetchedData[i]);
        setPageData(_data);
      }
    }
  }, [fetchedData, currentPage]);

  function hideContextMenu() {
    const menu = contextMenu.current;
    if (menu) {
      menu.classList.add("hidden");
    }
  }

  function showContextMenu() {
    const menu = contextMenu.current;
    if (menu) {
      menu.classList.remove("hidden");
    }
  }

  function refresh(event) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  const selectRow = (event) => {
    setSelection(true);
  };
  const handleContextMenu = (event) => {
    event.preventDefault();
    hideContextMenu();
    const menu = contextMenu.current;
    event.currentTarget.classList.add("active");
    const offsetBox = event.currentTarget.offsetParent;

    menu.style.display = "block";
    const menuWidth = menu.offsetWidth;
    const menuHeight = menu.offsetHeight;
    menu.style.display = "";
    // Determine position for the menu
    let posX = event.pageX;
    let posY = event.pageY;
    // Check if the menu goes beyond the right edge of the window
    if (posX + menuWidth > offsetBox.offsetLeft + offsetBox.clientWidth) {
      posX = offsetBox.offsetLeft + offsetBox.clientWidth - menuWidth;
    }

    // Check if the menu goes beyond the bottom edge of the window
    if (posY + menuHeight > offsetBox.offsetTop + offsetBox.clientHeight) {
      posY = offsetBox.offsetTop + offsetBox.clientHeight - menuHeight;
    }

    menu.style.left = posX + "px";
    menu.style.top = posY + "px";
    menu.contextData = {
      active: event.currentTarget.id,
    };
    showContextMenu();
  };
  return (
    <div
      id={"table-wrapper"}
      className={
        "rounded-md overflow-clip flex flex-col border-2 dark:border-primary-950"
      }
    >
      <ContextMenu innerRef={contextMenu} options={actions}></ContextMenu>
      <div className="overflow-x-auto shadow-md ">
        {selection ? (
          <div
            className={
              "p-4 bg-primary-300 shadow-md text-primary-100 dark:bg-primary-950 dark:text-primary-300"
            }
          >
            <Button
              icon={faClose}
              onClick={() => {
                setSelection(false);
              }}
            ></Button>
          </div>
        ) : null}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-primary-900 uppercase bg-primary-200 dark:bg-primary-950 dark:bg-opacity-50 dark:text-primary-50">
            <tr>
              {selection ? (
                <td className={"p-4"}>
                  <CheckBox />
                </td>
              ) : null}
              {columns
                ? columns.map((column, index) => {
                    return (
                      <th scope="col" className="px-6 py-5" key={index}>
                        {column.header}
                      </th>
                    );
                  })
                : null}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  className="p-6 text-center select-none cursor-pointer"
                  colSpan={columns.length}
                >
                  <div className={"w-full flex items-center justify-center"}>
                    <Loader></Loader>
                  </div>
                </td>
              </tr>
            ) : pageData.length ? (
              pageData.map((row, index) => {
                return (
                  <tr
                    className={`${index === pageData.length - 1 ? null : "border-b"} dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all ease-linear cursor-pointer`}
                    onClick={selectRow}
                    onContextMenu={handleContextMenu}
                    id={row[props.rowId]}
                  >
                    {selection ? (
                      <td className={"p-4"}>
                        <CheckBox />
                      </td>
                    ) : null}
                    {columns.map((column, index) => {
                      return (
                        <td className="px-6 py-4" key={index}>
                          {row[column.field]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  className="p-6 text-center select-none cursor-pointer"
                  colSpan={columns.length}
                  onClick={refresh}
                >
                  <p className={"text-lg font-bold"}>No data found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {fetchedData ? (
        <nav
          className={
            "w-full flex items-center justify-between p-4 dark:bg-primary-950 dark:bg-opacity-50 text-primary-50"
          }
        >
          <p className={"text-sm"}>
            Showing{" "}
            <span className={"font-bold"}>
              {pageLimit * (currentPage - 1)}
              {" - "}
              {pageLimit + pageLimit * (currentPage - 1)}
            </span>{" "}
            out of <span className={"font-bold"}>{fetchedData.length}</span>
          </p>
          <ul className="flex items-center -space-x-px h-8 text-xs">
            <li
              role={"button"}
              className="flex items-center justify-center px-3 h-8 leading-tight bg-white rounded-s-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => {
                setCurrentPage(1);
              }}
            >
              <span className="sr-only">First</span>
              <FontAwesomeIcon
                className={"size-2.5"}
                icon={faAngleDoubleLeft}
              ></FontAwesomeIcon>
            </li>
            <li
              role={"button"}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => {
                setCurrentPage(Math.max(1, currentPage - 1));
              }}
            >
              <span className="sr-only">Previous</span>
              <FontAwesomeIcon
                icon={faChevronLeft}
                className={"size-2.5"}
              ></FontAwesomeIcon>
            </li>

            {Array.from({
              length: Math.ceil(fetchedData.length / pageLimit),
            }).map((page, index) => {
              return (
                <li
                  role={"button"}
                  aria-current="page"
                  className={`${[currentPage - 1, currentPage, currentPage + 1].includes(index + 1) ? "flex" : "hidden"}  items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                  onClick={() => {
                    setCurrentPage(index + 1);
                  }}
                >
                  {index + 1}
                </li>
              );
            })}

            <li
              role={"button"}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              onClick={() => {
                setCurrentPage(
                  Math.min(
                    Math.ceil(fetchedData.length / pageLimit),
                    currentPage + 1,
                  ),
                );
              }}
            >
              <span className="sr-only">Next</span>
              <FontAwesomeIcon
                className={"size-2.5"}
                icon={faChevronRight}
              ></FontAwesomeIcon>
            </li>
            <li
              role={"button"}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => {
                setCurrentPage(Math.ceil(fetchedData.length / pageLimit));
              }}
            >
              <span className="sr-only">Last</span>
              <FontAwesomeIcon
                className={"size-2.5"}
                icon={faAngleDoubleRight}
              ></FontAwesomeIcon>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
