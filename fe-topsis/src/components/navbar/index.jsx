import logo from "/public/our.svg"
import { useState } from "react"
import Button from "../ui/Button"
import  ModalAuth  from "../modalAuth";

export default function Navbar (){
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="flex justify-between items-center container py-4 px-8 mx-auto">
        <img src={logo} alt="Company Logo" />
        <section>
          <Button variant="default" onClick={() => setIsOpen(true)}>Login</Button>
        </section>
        {isOpen && <ModalAuth setIsOpen={setIsOpen} />}
      </div>
    );
  }

