import React from 'react';

export function InputField({id, name, type, placeholder, required = false}) {
	return <div className={"w-full items-center"}>
		<label htmlFor={id}
		       className="block mb-2 ps-1 text-sm font-medium text-cyan-50 dark:text-cyan-100">{name}</label>
		<input type={type}
		       id={id}
		       name={id}
		       className={"bg-cyan-100  dark:bg-gray-900 border border-cyan-950 dark:border-cyan-600 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
		       required={required} />
	</div>
}


export function TextArea({id, name, placeholder, required = false, onType, inputRef}) {
	const _onType = (event) => {
		onType?onType(event):null
	}
	return <div className={"w-full items-center"}>
		<label htmlFor={id}
		       className="block mb-2 ps-1 text-sm font-medium text-cyan-50 dark:text-cyan-100">{name}</label>
		<textarea
			id={id}
			name={id}
			className={"bg-cyan-100  dark:bg-gray-900 border border-cyan-950 dark:border-cyan-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
			required={required}
			onChange={_onType}
		ref={inputRef}></textarea>
	</div>
}

export function Input({label, className, ...props}) {
	return (
		<div className="mb-4">
			{label && <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">{label}</label>}
			<input
				className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:outline-none focus:shadow-outline 
                ${className}`}
				{...props}
			/>
		</div>
	);
}

