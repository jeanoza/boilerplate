interface Props {
	type: string,
	name: string,
	placeholder: string,
	testid?: string
}

export default function InputField({ type, name, placeholder, testid }: Props) {
	return <div className="inputField m-2" data-testid={testid}>
		<label className="input-group w-80">
			<span className="w-32">{name}</span>
			<input type={type} placeholder={placeholder} className="input input-bordered" />
		</label>
	</div>
}