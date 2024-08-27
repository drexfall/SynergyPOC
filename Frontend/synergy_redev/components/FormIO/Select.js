import { InputField } from "./form";
import Button from "../custom/Button";
import { useEffect, useRef, useState } from "react";
import Loader from "../custom/Loader";

export function Select({
  name,
  id,
  search = true,
  options,
  onChange,
  onSelect,
}) {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState("Select");
  const [loading, isLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef();
  useEffect(() => {
    window.addEventListener("click", (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    });
    window.addEventListener("blur", (event) => {
      setIsOpen(false);
    });
  }, []);
  useEffect(() => {
    if (Array.isArray(options.data)) {
      setData(options.data);
      isLoading(false);
    } else if (typeof options.source === "string") {
      fetch(options.source)
        .then((res) => res.json())
        .then((res) => {
          setData(
            res.sort((a, b) => {
              return a[options["display"]] > b[options["display"]];
            }),
          );
          isLoading(false);
        })
        .catch((e) => {
          console.log(e);
          isLoading(false);
        });
    }
  }, [options]);
  useEffect(() => {
    onSelect(selected);
  }, [selected]);
  const filterData = async (value) => {
    isLoading(true);
    let filteredData = data.filter((d) => {
      return Object.values(d).includes(value);
    });
    setData(filteredData);
    isLoading(false);
  };
  return (
    <div
      className={`relative group w-full ${isOpen ? "active" : null}`}
      ref={selectRef}
    >
      <Button
        type={"dropdown"}
        text={selected.display}
        className={"w-full"}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div
        className={`${isOpen ? "flex" : "hidden"}  border-2 border-primary-950 top-full my-2 animate-slide z-50 absolute flex-col text-primary-100 bg-secondary-950 group-hover:shadow-primary-800 shadow-md shadow-primary-950 w-full rounded-md p-4 bg-clip-border transition-all`}
      >
        {search ? (
          <InputField placeholder={"Search"} onChange={filterData}></InputField>
        ) : null}
        <ul
          className={
            "flex min-w-[240px] max-h-64 overflow-y-auto flex-col my-2 font-sans text-base font-normal text-blue-gray-700"
          }
        >
          {loading ? (
            <div className={"w-full flex items-center justify-center p-2 mt-4"}>
              <Loader></Loader>
            </div>
          ) : data ? (
            data.map((option) => {
              return (
                <li
                  id={option[options.value]}
                  role={"button"}
                  className={
                    "flex items-center w-full p-2 leading-tight transition-all rounded outline-none text-start hover:bg-primary-500 hover:bg-opacity-40 hover:text-primary-100 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                  }
                  onClick={(event) => {
                    setSelected({
                      display: event.target.textContent,
                      value: event.target.id,
                    });
                    setIsOpen(false);
                  }}
                >
                  {option[options.display]}
                </li>
              );
            })
          ) : (
            <p>No data to select</p>
          )}
        </ul>
      </div>
    </div>
  );
}
