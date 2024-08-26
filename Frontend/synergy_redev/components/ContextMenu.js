import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ContextMenu({ innerRef, options }) {
  return (
    <div
      id="contextMenu"
      className="hidden absolute context-menu"
      ref={innerRef}
    >
      <ul className="menu flex flex-col rounded-md shadow-xl overflow-hidden border-cyan-900 dark:border-primary-950 border-2">
        {options.map((option, index) => {
          return (
            <li className={"w-full"} key={index}>
              <button
                type={"button"}
                className={
                  "text-sm cursor-pointer flex items-baseline w-full gap-3 bg-white dark:bg-secondary-950 hover:bg-gray-200 transition-all ease-linear dark:hover:bg-gray-500 p-3 h-full text-gray-800 dark:text-gray-200 relative"
                }
                onClick={() => {
                  option.onClick(innerRef.current.contextData);
                }}
              >
                {option.icon ? (
                  <FontAwesomeIcon
                    icon={option.icon}
                    className={"size-3"}
                  ></FontAwesomeIcon>
                ) : null}
                <span> {option.label}</span>
              </button>
              {index !== options.length - 1 ? (
                <hr
                  className={
                    "w-full border-primary-950 dark:border-primary-950 bg-primary-950"
                  }
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
