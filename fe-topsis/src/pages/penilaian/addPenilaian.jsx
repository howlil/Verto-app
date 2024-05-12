import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import getAlternatif from "../alternatif/apis/getAlternatif";
import addPenilaian from "./apis/addPenilaian";
import { useEffect,useState } from "react";
export default function AddPenilaian({ onClose, refreshData }) {
    const [alternatif, setAlternatif] = useState([]);
    const [selectedAlternatif, setSelectedAlternatif] = useState("");
    const [kriteria, setKriteria] = useState([]);
    const [penilaian, setPenilaian] = useState([]);
  

  const stopPropagation = (e) => {
    e.stopPropagation(); 
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    try {
      result = await addPenilaian({
        id_alternatif: selectedAlternatif,
        penilaian: penilaian,
      });
      if (result) {
        refreshData();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
}



  useEffect(() => {
    const fetchData = async () => {
      const resAl = await getAlternatif();
      const resuAl = resAl.data.alternatifs;
      setAlternatif(resuAl);
      const resK = await getKriteria();
      const resuK = resK.data.kriteria;
      setKriteria(resuK);
    };
    fetchData();
  },[])

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
        <form onSubmit={handleSubmit}>
            <Select
                label="Pilih Alternatif"
                options={alternatif.map((a) => ({ value: a.id, label: a.nama }))}
                onChange={(e) => setSelectedAlternatif(e.target.value)}
            />
          {kriteria.map((kriteria, index) => (
            <div key={kriteria.id}>
              <label>{kriteria.name}</label>
              <select
                value={penilaian[index]?.id_detail_kriteria || ''}
                onChange={(e) => {
                  const newPenilaian = [...penilaian];
                  newPenilaian[index] = { id_kriteria: kriteria.id, id_detail_kriteria: e.target.value };
                  setPenilaian(newPenilaian);
                }}
                required
              >
                <option value="">Select detail kriteria</option>
                {detailKriteria.map((dk) => (
                  <option key={dk.id} value={dk.id}>
                    {dk.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
            <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}
