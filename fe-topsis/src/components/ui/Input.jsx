
export default function Input({label, value,type ,onChange ,placeholder}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-md font-medium " >{label}</label>
      <input className="w-full px-3 py-2 border-2 border-neutral-700 rounded-md  " type={type} placeholder={placeholder} onChange={onChange} value={value} />
    </div>
  )
}
