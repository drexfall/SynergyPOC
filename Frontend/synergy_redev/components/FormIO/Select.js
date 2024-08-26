import { InputField } from "./form";
import Button from "../custom/Button";
import { useState } from "react";

export function Select({ name, id, options = [], value, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    // <div className={"flex flex-col"}>
    //   <label htmlFor={id}>{label}</label>
    //   <select name={name} id={id} value={value} onChange={onChange}>
    //     {options.map((option, index) => {
    //       return (
    //         <option key={index} value={option.value}>
    //           {option.label}
    //         </option>
    //       );
    //     })}
    //   </select>
    // </div>
    <div className={"relative"}>
      {/*<InputField type={"select"} />*/}
      <Button
        type={"dropdown"}
        text={"Select a template"}
        className={"w-full"}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div
        className={`${isOpen ? "flex" : "hidden"} top-4 relative flex-col text-primary-100 bg-secondary-800 shadow-md w-96 rounded-xl bg-clip-border`}
      >
        <ul
          className={
            "flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700"
          }
        >
          {options.map((option) => {
            return (
              <li
                role={"button"}
                className={
                  "flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                }
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
