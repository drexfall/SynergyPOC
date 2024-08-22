export function ContextMenu({innerRef, options}) {
	return <div id="contextMenu"
	            className="hidden absolute context-menu"
	            ref={innerRef}>
		<ul className="menu flex flex-col rounded-md shadow-xl overflow-hidden border-cyan-900 dark:border-cyan-50 border-2 dark:border-opacity-50">
			
			{options.map((option, index) => {
				return (<li
					className={"w-full"}
					key={index}>
					<button
						type={"button"}
						className={"text-sm cursor-pointer flex items-center w-full gap-4 bg-white dark:bg-gray-800 hover:bg-gray-200 transition-all ease-linear dark:hover:bg-gray-500 p-4 h-full text-gray-800 dark:text-gray-200 relative"}
						onClick={option.onClick}>
						{option.icon}
						{option.label}
					</button>
					{index!==options.length-1?<hr className={"w-full border-gray-400 dark:border-gray-500"}/>:null}
				</li>)
			})}
		</ul>
	</div>
	
	
}