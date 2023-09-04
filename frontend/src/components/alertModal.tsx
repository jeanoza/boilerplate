// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function AlertModal ({ alertText }: { alertText: string | undefined }) {
  return (<div className="alert shadow-lg my-1">
		<div>
			<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
			<span>{alertText}</span>
		</div>
	</div>
  )
}
