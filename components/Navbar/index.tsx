import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import img from "/public/logoo.svg";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex items-center py-6 justify-between w-full">
      <Image src={img} width={40} height={40} />
      <Button variant="cus">Sign In</Button>
    </div>
  );
}
