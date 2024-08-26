import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faArrowDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Button(props) {
  return (
    <button
      className={`${props.className} flex rounded-md px-3.5 py-2.5 text-sm font-semibold  transition-all ${props.type === "dropdown" ? "bg-primary-600 bg-opacity-50 group-hover:bg-opacity-65 text-primary-100 gap-2 justify-between" : "bg-transparent text-indigo-600 hover:bg-indigo-100"}`}
      id={props.id}
      onClick={props.onClick}
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
              className={"w-4 aspect-square"}
            ></FontAwesomeIcon>
          ) : null}
          {props.text ? <span>{props.text}</span> : null}
        </>
      )}
    </button>
  );
}
