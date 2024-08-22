import {InputField, TextArea} from "../FormIO/form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPencil, faRefresh, faTrash} from "@fortawesome/free-solid-svg-icons";
import {ContextMenu} from "../ContextMenu";
import {useEffect, useRef} from "react";
import tableData from "../FormIO/table.json"
import Table from "../custom/Table";

const columns = [
	{
		header: "Name",
		field: "Name"
	},
	{
		header: "Age",
		field: "Age"
	},
	{
		header: "Email",
		field: "Email"
	},
	{
		header: "Department",
		field: "DepartmentId_DepartmentName"
	}
]

export default function Dashboard() {
	
	return <form
		className="w-full flex flex-col gap-4 justify-center p-4 bg-gray-900 rounded-lg  shadow-2xl">
		
		<div className={"flex"}><InputField id={"TemplateCode"}
		                                    name={"Template Code"}
		                                    placeholder={"Json for your template"}
			// onType={onCode}
			// inputRef={codeInput}
		></InputField>
			<button type={"button"}
			        className={"p-2 btn text-cyan-100"}
				// onClick={onJson}
			>
				<FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon>
			</button>
		</div>
		
			<Table tableData={tableData} columns={columns}/>

	</form>
}