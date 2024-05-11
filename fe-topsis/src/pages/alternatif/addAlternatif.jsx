import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";
import addAlternatif from "./apis/addAlternatif";



const AddAlternatif = ({ onClose, refreshData }) => {
  const [nama, setNama] = useState("");
  const [data, setData] = useState([]);


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const result = await addAlternatif({ nama });
    setData(result);
    onClose();
    refreshData();
  } catch (error) {
    console.log('Error:', error);
  }
};
  const stopPropagation = (e) => {
    e.stopPropagation(); 
  };
  return (
    <div
      id="modal-backdrop"
      className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-1/3 px-8 py-8 rounded-lg shadow-md"
        onClick={stopPropagation}
      >
        <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-4">
          <Input
            label="Nama Alternatif"
            placeholder="Nama Alternatif"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
          <Button>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default AddAlternatif;
