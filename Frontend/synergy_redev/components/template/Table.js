import {InputField, TextArea} from "../FormIO/form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPencil, faRefresh, faTrash} from "@fortawesome/free-solid-svg-icons";
import {ContextMenu} from "../ContextMenu";
import {useEffect, useRef} from "react";
import tableData from "../FormIO/table.json"

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

export default function Table() {
	useEffect(() => {
		document.addEventListener('click', (event) => {
			hideContextMenu()
		})
		document.addEventListener('blur', (event) => {
			hideContextMenu()
		})
	}, []);
	const hideContextMenu = () => {
		const menu = contextMenu.current;
		menu.classList.add('hidden');
	}
	const showContextMenu = () => {
		const menu = contextMenu.current;
		menu.classList.remove('hidden');
	}
	const contextMenu = useRef()
	
	const handleContextMenu = (event) => {
		event.preventDefault()
		hideContextMenu()
		const menu = contextMenu.current;
		event.currentTarget.classList.add("active")
		const offsetBox = event.currentTarget.offsetParent

		menu.style.display = 'block';
		const menuWidth = menu.offsetWidth;
		const menuHeight = menu.offsetHeight;
		menu.style.display = '';
		// Determine position for the menu
		let posX = event.pageX;
		let posY = event.pageY;
		// Check if the menu goes beyond the right edge of the window
		if (posX + menuWidth > offsetBox.offsetLeft + offsetBox.clientWidth) {
			posX = offsetBox.offsetLeft + offsetBox.clientWidth - menuWidth;
		}
		
		// Check if the menu goes beyond the bottom edge of the window
		if (posY + menuHeight > offsetBox.offsetTop + offsetBox.clientHeight) {
			posY = offsetBox.offsetTop + offsetBox.clientHeight - menuHeight;
		}
		
		menu.style.left = posX + 'px';
		menu.style.top = posY + 'px';
		showContextMenu()
	}
	return <form
		className="w-full flex flex-col gap-4 justify-center p-4 bg-gray-800 rounded-lg border-2 border-cyan-950 dark:border-cyan-800 shadow-2xl">
		
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
		{/*<div className={"flex"}><InputField id={"Headers"}*/}
		{/*                                    name={"Headers"}*/}
		{/*                                    placeholder={"Headers for your table"}*/}
		{/*	// onType={onCode}*/}
		{/*	// inputRef={codeInput}*/}
		{/*></InputField>*/}
		{/*	<button type={"button"}*/}
		{/*	        className={"p-2 btn text-cyan-100"}*/}
		{/*		// onClick={onJson}*/}
		{/*	>*/}
		{/*		<FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon>*/}
		{/*	</button>*/}
		{/*</div>*/}
		<div id={"table-wrapper"}>
			<ContextMenu innerRef={contextMenu}
			             options={
				             [
					             {
						             label: "View",
						             icon: <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>,
						             onClick: () => {
							             console.log("View")
						             }
					             },
					             {
						             label: "Edit",
						             icon: <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>,
						             onClick: () => {
							             console.log("Edit")
						             }
					             },
					             {
						             label: "Delete",
						             icon: <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>,
						             onClick: () => {
							             console.log("Delete")
						             }
					             }
				             ]
			             }></ContextMenu>
			<div className=" overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						{columns.map((column, index) => {
							return <th scope="col"
							           className="px-6 py-5"
							           key={index}>
								{column.header}
							</th>
						})}
					</tr>
					</thead>
					<tbody>
					{tableData.map((row, index) => {
						return <tr
							className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all ease-linear cursor-pointer"
							onContextMenu={handleContextMenu} >
							{columns.map((columns, index) => {
								
								return <td className="px-6 py-4"
								           key={index}>
									{row[columns.field]}
								</td>
							})}
						</tr>
					})}
					</tbody>
				</table>
			</div>
		</div>
	</form>
}