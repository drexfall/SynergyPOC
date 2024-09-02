import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, size, ...props }) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  const modeMap = {
    primary:
        "bg-indigo-800 dark:bg-indigo-800 hover:bg-indigo-600 hover:text-primary-100 text-primary-100 dark:text-primary-100 dark:hover:bg-indigo-700",
    secondary:
        "bg-gray-500 dark:bg-gray-800 hover:bg-indigo-600 hover:text-primary-50 text-primary-100 dark:text-primary-100 dark:hover:bg-indigo-700",
  };
  return (
      <button
          className={`${props.className} ${size==="small"?"px-2.5 py-1.5":" px-3.5 py-2.5 "} ${primary? modeMap.primary:modeMap.secondary} flex rounded items-center text-sm font-semibold gap-2 transition-all ${props.type === "dropdown" ? "bg-indigo-600 bg-opacity-50 group-hover:bg-opacity-65 text-primary-100 justify-between" : null}`}
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
              {props.text ? <span className={size==="small"?"text-xs":""}>{props.text}</span> : null}
            </>
        )}
      </button>
  );
};

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  text: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  primary: false,
  size: 'medium',
  onClick: undefined,
  text:"Button"
};
