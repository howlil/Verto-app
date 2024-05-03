import img from "/public/logoo.svg";
import Image from "next/image";
import LoginModal from "../Modal/LoginModal";

export default function Navbar() {
  return (
    <div className="flex items-center py-6 justify-between w-full">
      <Image src={img} width={40} height={40} alt="omg"/>
      <LoginModal />
    </div>
  );
}
