export function Select({name, id, options, value, onChange, label}) {
	return <div className={"flex flex-col"}>
		<label htmlFor={id}>{label}</label>
		<select name={name} id={id} value={value} onChange={onChange}>
			{options.map((option, index) => {
				return <option key={index} value={option.value}>{option.label}</option>
			})}
		</select>
	</div>
}