import {useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClose, faCross} from "@fortawesome/free-solid-svg-icons";

function InputField({id, name, type, placeholder, required = false}) {
	return <>
		<label htmlFor={id}
		       className="block mb-2 ps-1 text-sm font-medium text-cyan-50 dark:text-cyan-100">{name}</label>
		<input type={type}
		       id={id}
		       name={id}
		       className={"bg-cyan-100  dark:bg-gray-900 border border-cyan-950 dark:border-cyan-600 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
		       required={required} />
	</>
}


function TextArea({id, name, placeholder, required = false}) {
	return <>
		<label htmlFor={id}
		       className="block mb-2 ps-1 text-sm font-medium text-cyan-50 dark:text-cyan-100">{name}</label>
		<textarea
			id={id}
			name={id}
			className={"bg-cyan-100  dark:bg-gray-900 border border-cyan-950 dark:border-cyan-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
			required={required}></textarea>
	</>
}

export default function General() {
	const templateRef = useRef();
	const handleSubmission = (event) => {
		let data = new FormData(templateRef.current)
		event.preventDefault()
		fetch("https://localhost:5000/api/template/", {
			method: "post",
			headers: new Headers({
				"Accept": "application/json",
			}),
			body: data
		}).then(response => {
			console.log(response)
			return response.json();
		}).then(result => {
			console.log(result)
		})
	}
	return <form
		ref={templateRef}
		className="w-full flex flex-col justify-center p-4 bg-cyan-950 rounded-lg border-2 border-cyan-950 dark:border-cyan-800 shadow-2xl">
		<div className="mb-5">
			<InputField id={"Name"}
			            name={"Name"}
			            type={"text"}
			            required={true}></InputField>
		
		</div>
		<div className="mb-5">
			<InputField id={"DisplayName"}
			            name={"Display Name"}
			            type={"text"}
			></InputField>
		</div>
		<div className="mb-5">
			<InputField id={"Code"}
			            name={"Code"}
			            type={"text"}
			            required={true}></InputField>
		</div>
		<div className="mb-5">
			<TextArea id={"Description"}
			          name={"Description"}
			          type={"text"}
			          required={true}></TextArea>
		</div>
		<div className={"flex items-center justify-between mb-5 w-full"}>
			<p className={"text-cyan-100 text-sm"}>Enable workflow?</p>
			<label
				htmlFor="AcceptConditions"
				className={"relative inline-block h-7 w-12 cursor-pointer rounded-full bg-gray-50 dark:bg-gray-700 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"}
			>
				<input
					type="checkbox"
					id="AcceptConditions"
					className="peer sr-only [&:checked_+_span_span[data-state='false']]:block [&:checked_+_span_span[data-state='true']]:hidden"
				/>
				
				<span
					className="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-5 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600"
				>
					<span data-state={true}>
						<FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
					</span><span data-state={false}
					             className={"hidden"}>
						<FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
					</span>
   
  </span>
			</label>
		
		</div>
		<div className={"flex gap-3 justify-end"}>
			<button type="submit"
			        className="text-white border-2 border-red-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  dark:hover:bg-red-700 dark:focus:ring-blue-800 transition-all">
				Reset
			</button>
			<button type="submit"
			        className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-blue-800 transition-all"
			        onClick={handleSubmission}>Submit
			</button>
		</div>
	</form>
	
}