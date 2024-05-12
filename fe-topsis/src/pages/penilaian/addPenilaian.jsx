import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import getAlternatif from "../alternatif/apis/getAlternatif";
import addPenilaianApi from "./apis/addPenilaian";
import getKriteria from "../kriteria/api/getKriteria";
import getNilaiKriteria from "../nilai-kriteria/api/getNilaiKriteria";

export default function AddPenilaian({ onClose, refreshData }) {
  const [alternatif, setAlternatif] = useState([]);
  const [selectedAlternatif, setSelectedAlternatif] = useState("");
  const [kriteria, setKriteria] = useState([]);
  const [detailKriteria, setDetailKriteria] = useState({});
  const [penilaian, setPenilaian] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alternatifData = await getAlternatif();
        if (alternatifData && alternatifData.data) {
          setAlternatif(alternatifData.data.alternatifs);
        }

        const kriteriaData = await getKriteria();
        if (kriteriaData && kriteriaData.data) {
          setKriteria(kriteriaData.data.kriteria);
          // Initialize detailKriteria object with keys for each kriteria
          const details = {};
          for (let k of kriteriaData.data.kriteria) {
            const detailData = await getNilaiKriteria(k.id);
            if (detailData && detailData.data) {
              details[k.id] = detailData.data.details;
            }
          }
          setDetailKriteria(details);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addPenilaianApi({
        id_alternatif: selectedAlternatif,
        penilaian,
      });
      if (result && result.success) {
        refreshData();
        onClose();
      } else {
        throw new Error("Failed to add evaluation");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-1/3 px-8 py-8 rounded-lg shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-4">
          <Select
            label="Pilih Alternatif"
            options={alternatif.map((a) => ({ value: a.id, label: a.nama }))}
            onChange={(e) => setSelectedAlternatif(e.target.value)}
          />
          {kriteria.map((k, index) => (
            <div key={k.id}>
              <label className="block text-gray-700 text-lg font-medium mb-2">
                {k.nama}
              </label>
              <select
                value={penilaian[index]?.id_detail_kriteria || ""}
                onChange={(e) => {
                  const newPenilaian = [...penilaian];
                  newPenilaian[index] = {
                    id_kriteria: k.id,
                    id_detail_kriteria: e.target.value,
                  };
                  setPenilaian(newPenilaian);
                }}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select detail</option>
                {(detailKriteria[k.id] || [])
                  .filter((dk) => dk.id_kriteria === k.id)
                  .map((dk) => (
                    <option key={dk.id} value={dk.id}>
                      {dk.deskripsi} (Nilai: {dk.nilai})
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
