import {ContextMenu} from "../ContextMenu";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import Loader from "./Loader";

export default function Table({tableData, columns, pageLimit = 10}) {
	const [pageData, setPageData] = useState([])
	const [loading, setLoading] = useState(true)
	const contextMenu = useRef()
	useEffect(() => {
		document.addEventListener('click', (event) => {
			hideContextMenu()
		})
		document.addEventListener('blur', (event) => {
			hideContextMenu()
		})
		getPageData().then(r=>{
			setLoading(false)
		})
	}, []);
	
	async function getPageData(page=1) {
		let data =[]
		for (let i = 0; i < pageLimit; i++) {
			data.push(tableData[i])
		}
		setPageData(data)
	}
	function hideContextMenu() {
		const menu = contextMenu.current;
		menu.classList.add('hidden');
	}
	
	function showContextMenu() {
		const menu = contextMenu.current;
		menu.classList.remove('hidden');
	}
	
	function refresh(event) {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 2000)
	}
	
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
	return (
		<div id={"table-wrapper"}>
			<ContextMenu innerRef={contextMenu}
			             options={
				             [
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
			<div className="bg-gray-800 overflow-x-auto shadow-md sm:rounded-lg">
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
					{loading ? <tr>
						<td className="p-6 text-center select-none cursor-pointer"
						    colspan={columns.length}>
							<div className={"w-full flex items-center justify-center"}>
								<Loader></Loader>
							</div>
						</td>
					</tr> : (pageData.length ? pageData.map((row, index) => {
						return <tr
							className={`${index ===pageData.length-1?null:"border-b"} dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all ease-linear cursor-pointer`}
							onContextMenu={handleContextMenu}>
							{columns.map((columns, index) => {
								
								return <td className="px-6 py-4"
								           key={index}>
									{row[columns.field]}
								</td>
							})}
						</tr>
					}) : <tr>
						<td className="p-6 text-center select-none cursor-pointer"
						    colspan={columns.length}
						    onClick={refresh}>
							<p className={"text-lg font-bold"}>No data found</p>
						</td>
					</tr>)
					}
					</tbody>
				</table>
			</div>
		</div>
	)
	
}
			