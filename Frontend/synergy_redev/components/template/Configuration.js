import {TextArea} from "../FormIO/form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRefresh} from "@fortawesome/free-solid-svg-icons";
import {useRef} from "react";
import map from "../FormIO/componentMap";
import compJson from '../FormIO/comp.json';

function getComponents(json) {
	console.log(json)
	let components;
	components = [];
	if (json.components === undefined || json.components === null) {
		return <div></div>
	}
	json.components.forEach((component, index) => {
			let componentElement = getComponents(json.components)
			components.push(componentElement)
		}
	)
	return components
}

export default function Configuration() {
	let jsonInput = useRef()
	const onJson = (event) => {
		let componentJson = []
		try {
			componentJson = JSON.parse(event.target.value)
		} catch (e) {
			
			// return console.log(e)
			componentJson = compJson
		}
		
		let formComponents = document.getElementById("form-components")
		let components = getComponents(componentJson)
		
		components.forEach(component => {
			formComponents.append(component)
		})
	}
	return <form
		className="w-full flex flex-col justify-center p-4 bg-gray-800 rounded-lg border-2 border-cyan-950 dark:border-cyan-800 shadow-2xl">
		<div className={"flex gap-4 items-center"}>
			<TextArea id={"Json"}
			          name={"Json"}
			          placeholder={"Json for your template"}
			          onType={onJson}
			          inputRef={jsonInput}
			></TextArea>
			<button type={"button"}
			        className={"p-2 btn text-cyan-100"}
			        onClick={onJson}>
				<FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon>
			</button>
		</div>
		<div id={"form-wrapper"}>
			<div id={"form-components"}></div>
		</div>
	</form>
}