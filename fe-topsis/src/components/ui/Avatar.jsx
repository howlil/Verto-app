import img from "/public/aaaa.svg"

export default function Avatar() {
  return (
    <div className="w-12   rounded-full ">
      <img src={img} alt="a" className="w-12 rounded-full object-contain"  />
    </div>
  )
}
