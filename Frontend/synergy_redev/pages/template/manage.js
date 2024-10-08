import React from "react";
import General from "../../components/template/General";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faTable } from "@fortawesome/free-solid-svg-icons";
import {
  faChartBar,
  faPenToSquare,
  faRectangleList,
} from "@fortawesome/free-regular-svg-icons";
import Configuration from "../../components/template/Configuration";
import Dashboard from "../../components/template/Dashboard";
import Workflow from "../../components/template/Workflow";

let elementArray = [
  { component: General, icon: faPenToSquare },
  { component: Configuration, icon: faGear },
  { component: Dashboard, icon: faRectangleList },
  { component: Workflow, icon: faChartBar },
];

function TabItem({ name, icon, active, group, target }) {
  const handleClick = (event) => {
    const tabItem = event.target.classList.contains("tab-item")
      ? event.target
      : event.target.closest(".tab-item");
    const tabGroup = tabItem.dataset.group;
    const allTabs = document.querySelectorAll(`${tabGroup} .tab-item`);

    allTabs.forEach((tab) => {
      let pane = document.querySelector(tab.dataset.target);
      if (tab === tabItem) {
        tab.classList.add("active");
        pane.classList.add("active");
      } else {
        tab.classList.remove("active");
        pane.classList.remove("active");
      }
    });
  };

  return (
    <li
      className={`tab-item me-2 ${active ? "active" : ""}`}
      data-group={group}
      data-target={target}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
      {name}
    </li>
  );
}

export default function Manage() {
  return (
    <>
      <div className={"w-full h-full p-6"}>
        <h1 className={"text-cyan-50 font-bold mb-5 text-center text-4xl"}>
          Template Editor
        </h1>
        <div className={"w-full flex flex-col gap-4 items-center"}>
          <div className="border-b border-gray-200 dark:border-gray-700">
            <ul
              id={"template-tabs"}
              className="flex text-sm font-medium text-center text-gray-500 dark:text-gray-400"
            >
              {elementArray.map((element, index) => {
                return (
                  <TabItem
                    icon={element.icon}
                    name={element.component.name}
                    group={"#template-tabs"}
                    target={`#${element.component.name}-pane`}
                    active={index === 0}
                  />
                );
              })}
            </ul>
          </div>
          <section
            className={"panes max-w-6xl w-full flex items-center flex-col"}
          >
            {elementArray.map((element, index) => {
              console.log(element);
              return (
                <div
                  id={element.component.name + "-pane"}
                  key={index}
                  className={`pane w-full ${index === 0 ? "active" : ""}`}
                >
                  {React.createElement(element.component, {})}
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </>
  );
}
