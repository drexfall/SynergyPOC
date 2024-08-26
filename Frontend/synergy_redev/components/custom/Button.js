import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Button(props) {
  console.log(props);
  return (
    <button
      className={
        "bg-transparent rounded-md px-3.5 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-100 transition-all"
      }
      id={props.id}
      onClick={props.onClick}
    >
      {
        <>
          {props.icon ? (
            <FontAwesomeIcon
              icon={props.icon}
              className={"w-4 aspect-square"}
            ></FontAwesomeIcon>
          ) : null}
          {props.text ? <span>{props.text}</span> : null}
        </>
      }
    </button>
  );
}
