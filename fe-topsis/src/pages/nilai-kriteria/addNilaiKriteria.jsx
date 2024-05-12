import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";
import addDetailKriteria from "./api/addDetailKriteria";
import Select from "@/components/ui/Select";
import getKriteria from "../kriteria/api/getKriteria";

const AddNilaiKriteria = ({ onClose, refreshData }) => {
  const [kriteria, setKriteria] = useState([]);
  const [selectKriteria, setSelectKriteria] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [nilai, setNilai] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let nilaiInt = parseFloat(nilai);
    try {
      await addDetailKriteria({ selectKriteria, deskripsi, nilaiInt });
      refreshData();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchKriteria = async () => {
      const response = await getKriteria();
      const result = response.data.kriteria;
      setKriteria(result);
    };
    fetchKriteria();
  }, []);

  const stopPropagation = (e) => {
    e.stopPropagation(); // Prevent click event from bubbling up to the backdrop
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
          <Select
            label="Pilih Kriteria"
            options={kriteria.map((k) => ({ value: k.id, label: k.nama }))}
            onChange={(e) => setSelectKriteria(e.target.value)}
          />
          <Input
            label="Nama Nilai Kriteria"
            placeholder="Nama NIlai Kriteria"
            type="text"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
          <Input
            label="Jumlah Nilai Fuzzy"
            placeholder="Masukan Nilai"
            type="number"
            value={nilai}
            onChange={(e) => setNilai(e.target.value)}
          />
          <Button>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default AddNilaiKriteria;
