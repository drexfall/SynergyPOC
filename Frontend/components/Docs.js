import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const iconTypeMap = {
  success: faCheckCircle,
  danger: faExclamationTriangle,
  info: faInfoCircle,
};
export function Info({ heading, text, type = "info" }) {
  return (
    <div
      role="alert"
      className={`my-2 shadow-md rounded border-s-4 border-${type}-700 bg-${type}-100 p-4 dark:border-${type}-800 dark:bg-${type}-800 dark:bg-opacity-30`}
    >
      <div
        className={`flex items-center gap-2 text-${type}-800 dark:text-${type}-300`}
      >
        <FontAwesomeIcon icon={iconTypeMap[type]} className={"size-3.5"} />
        <p className="block font-bold text-inherit text-sm"> {heading} </p>
      </div>

      <p className={`mt-2 text-xs text-${type}-700 dark:text-${type}-200`}>
        {text}
      </p>
    </div>
  );
}

export function Alert() {
  return (
    <div
      role="alert"
      className="rounded-xl border border-gray-100 bg-white p-4"
    >
      <div className="flex items-start gap-4">
        <span className="text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>

        <div className="flex-1">
          <strong className="block font-medium text-gray-900">
            {" "}
            Changes saved{" "}
          </strong>

          <p className="mt-1 text-sm text-gray-700">
            Your product changes have been saved.
          </p>
        </div>

        <button className="text-gray-500 transition hover:text-gray-600">
          <span className="sr-only">Dismiss popup</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
