import React from "react";
import General from "../../components/template/General";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import {faChartBar, faPenToSquare, faRectangleList} from "@fortawesome/free-regular-svg-icons";
import Configuration from "../../components/template/Configuration";
import Dashboard from "../../components/template/Dashboard";
import Workflow from "../../components/template/Workflow";

let elementArray = [
	{name: "General", component: <General />, icon: faPenToSquare},
	{name: "Configuration", component: <Configuration />, icon: faGear},
	{name: "Dashboard", component: <Dashboard />, icon: faRectangleList},
	{name: "Workflow", component: <Workflow />, icon: faChartBar}
];

function TabItem({name, icon, active}) {
	return <li className="me-2">
		<btn
			className={active ? "inline-flex gap-2 items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" : "inline-flex gap-2 items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"}>
			<FontAwesomeIcon icon={icon}></FontAwesomeIcon>
			{name}
		</btn>
	</li>
	
}

export default function Manage() {
	return (
		<>
			<div className={"w-full h-full p-6"}>
				<div className={"max-w-xl"}>
					<h1 className={"text-cyan-50 font-bold  text-4xl"}>Template Editor</h1>
					<div className="max-w-lg self-center border-b border-gray-200 dark:border-gray-700">
						<ul className="flex text-sm font-medium text-center text-gray-500 dark:text-gray-400">
							{elementArray.map((element, index) => {
								return <TabItem icon={element.icon}
								                name={element.name}
								                active={index === 0} />
							})}
						</ul>
					</div>
					<section id={"template-panes w-full"}>
						{elementArray.map((element, index) => {
							return <div key={index}
							            className={"w-full"}>
								{element.component}
							</div>
						})}
					</section>
				</div>
			</div>
		
		</>
	)
}