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
import { CheckBox, InputField } from "../FormIO/form";
import Button from "./Button";
import { Select } from "../FormIO/Select";

export default function Table({
  data,
  columns,
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
  const [allData, setAllData] = useState([]);
  const [fetchedData, setFetchedData] = useState(data);
  const [fetchedColumns, setFetchedColumns] = useState(columns);
  const [pageData, setPageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selection, setSelection] = useState(false);
  const [colFilter, selColFilter] = useState({
    data: [],
    display: "display",
    value: "value"
  });
  const [fInput, setFInput] = useState("")
  const [fSelect, SetFSelect] = useState({
    display: "",
    value: ""
  })
  const contextMenu = useRef();
  useEffect(() => {
    document.addEventListener("click", (event) => {
      hideContextMenu();
    });
    document.addEventListener("blur", (event) => {
      hideContextMenu();
    });
    if (!data || !columns) {
      setFetchedData(null);
      setFetchedColumns(null);
      setAllData([]);
      setLoading(false);
      return;
    }
    if (typeof data === "function") {
      data().then((res) => {
        setFetchedData(res);
        setLoading(false);
      });
    }
    if (typeof columns === "function") {
      columns().then((res) => {
        setFetchedColumns(res);
        setLoading(false);
      });
    }
    if (Array.isArray(data)) {
      data.length ? setFetchedData(data) : setFetchedData(null);
      setLoading(false);
    }
    if (typeof data.source === "string") {
      axios.get(data.source).then((res) => {
        if (Array.isArray(res.data)) {
          setFetchedData(res.data);
          setAllData(res.data);
          setLoading(false);
        }
      }).catch((e) => {
        setFetchedData(null);
        console.log(e);
      });

      if (columns.length > 0) {
        const cols = columns.map((item) => {
          const tempObj = {
            display: item.header,
            value: item.field
          }
          return tempObj
        })
        const tempData = { ...colFilter }
        tempData.data = [...cols]
  
        //console.log(tempData, "my cols")
        selColFilter(tempData);
      }
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(fetchedData)) {
      let _data = [],
        lowerLimit = (currentPage - 1) * pageLimit,
        upperLimit = Math.min(
          fetchedData.length,
          pageLimit + (currentPage - 1) * pageLimit,
        );
      for (let i = lowerLimit; i < upperLimit; i++) {
        if(fetchedData[i]){

          _data.push(fetchedData[i]);
        }
      }
      // console.log("pagination", _data)
      setPageData(_data);
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
  const onSelect = (selectedVal) => {
    SetFSelect(selectedVal);
    handleFilter(fInput, selectedVal)
    // console.log(selectedVal, "value on select");
  }
  const onChange = (inputVal) => {
    setFInput(inputVal);
    handleFilter(inputVal, fSelect)
    // console.log(inputVal, "input from textField")
  }
  const handleFilter = (inputText, selectText) => {
    if (!fetchedData.length > 0) {
      return
    }
    console.log(colFilter, " col data")
    //console.log(allData, " all data", typeof allData)
    const newFilteredData =[]; 
    allData.forEach((allItem) => {
      console.log(allItem, " my item")
      if (selectText.value) {

        if(allItem[selectText.value].toLowerCase().includes(inputText.toString().toLowerCase())){
          newFilteredData.push(allItem)
        }
      } else {
        
        const tempData =  []
        colFilter.data.forEach(item =>{
          if(allItem[item.value].toLowerCase().includes(inputText.toString().toLowerCase())){

            console.log( allItem[item.value]," inside item " , inputText.toString().toLowerCase() )
            newFilteredData.push(allItem)
          }
          //console.log(allItem[item.value], " fields" ,  inputText.toString().toLowerCase())
          //return allItem[item.value].toLowerCase().includes(inputText.toString().toLowerCase())
        }
        );
        //console.log(tempData, " dynamic filter");
        //return tempData
      }
    })
    console.log(inputText, " input", selectText, " select", newFilteredData, " new f")
    if(Array.isArray(newFilteredData)){

      setFetchedData(newFilteredData)
    }
  }
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
      id: event.currentTarget.id,
      name: event.currentTarget.dataset.name,
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

          <div
            className={
              "p-4 bg-primary-300 shadow-md border-l-4 text-primary-100 dark:bg-primary-950 dark:text-primary-300"
            }
          >
            {selection ? (

              <Button
                icon={faClose}
                onClick={() => {
                  setSelection(false);
                }}
              ></Button>
            ) : null}
            {columns.length > 0 ?
              < >
                <InputField
                  type="text"
                  placeholder="Search Here"
                  required={false}
                  id="Search-filter"
                  onChange={onChange}
                />
                <Select
                  options={colFilter}
                  onSelect={onSelect}
                />
              </> : null}
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-primary-900 uppercase bg-primary-200 dark:bg-primary-950 dark:bg-opacity-50 dark:text-primary-50">
            <tr>
              {selection ? (
                <td className={"p-4"}>
                  <CheckBox />
                </td>
              ) : null}
              {fetchedColumns
                ? fetchedColumns.map((column, index) => {
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
            ) : pageData ? (
              pageData.map((row, index) => {
                return (
                  <tr
                    className={`${index === pageData.length - 1 ? null : "border-b"} h-10 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all ease-linear cursor-pointer`}
                    onClick={selectRow}
                    onContextMenu={handleContextMenu}
                    id={row[props.rowId]}
                    data-name={row[props.rowName]}
                  >
                    {selection ? (
                      <td className={"p-4 "}>
                        <CheckBox />
                      </td>
                    ) : null}
                    {fetchedColumns
                      ? fetchedColumns.map((column, index) => {
                          return (
                            <td className=" px-6 py-4" key={index}>
                              {row[column.field]}
                            </td>
                          );
                        })
                      : null}
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
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white rounded-s-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
                  id={`page-${index + 1}`}
                  className={`${[currentPage - 1, currentPage, currentPage + 1].includes(index + 1) ? "flex" : "hidden"} items-center justify-center px-3 h-8 text-gray-500 leading-tight border 
                  border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700
                  ${currentPage === index + 1 && "bg-indigo-400 text-white hover:bg-indigo-400 dark:bg-blue-100 dark:text-blue-700 dark:hover:bg-blue-100"}`}
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
    )
}
