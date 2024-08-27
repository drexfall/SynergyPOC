import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faArrowDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Button({ mode = "primary", ...props }) {
  const modeMap = {
    primary:
      "bg-primary-800 dark:bg-primary-800 hover:bg-primary-600 hover:text-primary-100 text-primary-100 dark:text-primary-100 dark:hover:bg-primary-700",
    secondary:
      "bg-secondary-500 dark:bg-secondary-800 hover:bg-primary-600 hover:text-primary-50 text-primary-100 dark:text-primary-100 dark:hover:bg-primary-700",
  };
  return (
    <button
      className={`${props.className} ${modeMap[mode]} flex rounded px-3.5 py-2.5 items-center text-sm font-semibold gap-2 transition-all ${props.type === "dropdown" ? "bg-primary-600 bg-opacity-50 group-hover:bg-opacity-65 text-primary-100 justify-between" : null}`}
      id={props.id}
      onClick={props.onClick}
      type={props.type}
    >
      {props.type === "dropdown" ? (
        <>
          {props.text ? <span>{props.text}</span> : "Select"}

          <FontAwesomeIcon
            icon={faChevronDown}
            className={"w-4 aspect-square"}
          ></FontAwesomeIcon>
        </>
      ) : (
        <>
          {props.icon ? (
            <FontAwesomeIcon
              icon={props.icon}
              className={"size-4"}
            ></FontAwesomeIcon>
          ) : null}
          {props.text ? <span>{props.text}</span> : null}
        </>
      )}
    </button>
  );
}
