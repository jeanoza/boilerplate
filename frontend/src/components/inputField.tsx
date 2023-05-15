interface Props {
	type: string;
	name: string;
	placeholder: string;
	register: any;
	testid?: string;
}

export default function InputField({ register, type, name, placeholder, testid }: Props) {
	return <div className="inputField m-2" >
		<label className="input-group w-80">
			<span className="w-32">{name}</span>
			<input {...register(name)} type={type} placeholder={placeholder} className="input input-bordered" data-testid={testid} />
		</label>
	</div>
}