import React, {useRef} from 'react';

export function InputField({id, name, type, placeholder, required = false, inputRef = useRef()}) {
	return <div className={"w-full flex gap-4 items-center justify-between"}>
		{name?
		<label htmlFor={id}
		       className="font-semibold ps-2  text-sm text-indigo-950 dark:text-cyan-100">{name}</label>
			:
		null
		}
		<input type={type}
		       id={id}
		       name={id}
		       className={"w-1/2 border border-indigo-700 dark:border-indigo-600  dark:bg-gray-900 text-gray-900 text-sm rounded focus:ring-indigo-900 focus:border-indigo-900 block p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
		       required={required}
			   ref={inputRef}
		placeholder={placeholder}
		/>
	</div>
}


export function TextArea({id, name, placeholder, required = false, onType, inputRef}) {
	const _onType = (event) => {
		onType?onType(event):null
	}
	return <div className={"w-full flex gap-4 items-center justify-between" }>
		<label htmlFor={id}
		       className="font-semibold ps-2 w-2/12 text-sm text-indigo-950 dark:text-cyan-100">{name}</label>
		<textarea
			id={id}
			name={id}
			className={"w-1/2 border border-indigo-700 dark:border-indigo-600  dark:bg-gray-900 text-gray-900 text-sm rounded  focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
			required={required}
			onChange={_onType}
		ref={inputRef}></textarea>
	</div>
}

// export function Input({label, className, ...props}) {
// 	return (
// 		<div className="mb-4">
// 			{label && <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">{label}</label>}
// 			<input
// 				className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
//                 leading-tight focus:outline-none focus:shadow-outline
//                 ${className}`}
// 				{...props}
// 			/>
// 		</div>
// 	);
// }
//
