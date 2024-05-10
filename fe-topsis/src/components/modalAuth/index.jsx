import { ModalLogin } from "./modalLogin";
 const ModalAuth =({ setIsOpen }) =>{
    const handleClose = (e) => {
      if (e.target.id === "modal-backdrop") {
        setIsOpen(false);
      }
    };
  
    return (
      <div id="modal-backdrop" onClick={handleClose} className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white w-1/3 px-8 py-8 rounded-lg shadow-md">
          <h1 className="font-semibold text-center text-2xl mb-4">Login Akun</h1>
          <ModalLogin setIsOpen={setIsOpen}/>
        </div>
      </div>
    );
  }

  export default ModalAuth