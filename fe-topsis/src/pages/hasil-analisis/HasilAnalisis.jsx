import Layout from "@/components/Layout";
import Title from "@/components/ui/Title";
import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";
import getPenilaian from "../penilaian/apis/getPenilaian";
export default function HasilAnalisis() {
  const [arrayData, setArrayData] = useState([]);
  const [bobot, setBobot] = useState([]);
  const [tipe, setTipe] = useState([]);

  const fetchPenilaian = async () => {
    try {
      const response = await getPenilaian();
      const fetchedData = response.data;

      // Group DetailKriteria.nilai by id_alternatif
      const groupedByAlternatif = fetchedData.reduce((acc, current) => {
        if (!acc[current.id_alternatif]) {
          acc[current.id_alternatif] = [];
        }
        acc[current.id_alternatif].push(current.DetailKriteria.nilai);
        return acc;
      }, {});

      // Extract unique id_kriteria and bobot pairs
      const criteriaWeights = fetchedData.reduce((acc, current) => {
        acc[current.id_kriteria] = current.Kriteria.bobot; // This will overwrite duplicates, leaving only unique pairs
        return acc;
      }, {});

      // Extract unique id_kriteria and tipe pairs
      const criteriaTypes = fetchedData.reduce((acc, current) => {
        acc[current.id_kriteria] = current.Kriteria.tipe; // This will overwrite duplicates, ensuring each id_kriteria's tipe is unique
        return acc;
      }, {});

      // Convert the grouped object into a 2D array
      const valuesArray = Object.values(groupedByAlternatif);
      setArrayData(valuesArray);

      // Convert criteriaWeights map to an array of [id_kriteria, bobot]
      const criteriaWeightsArray = Object.entries(criteriaWeights);
      setBobot(criteriaWeightsArray);

      // Convert criteriaTypes map to an array of [id_kriteria, tipe]
      const criteriaTypesArray = Object.entries(criteriaTypes);
      setTipe(criteriaTypesArray); // Assuming you have a setState function setTipe to store this array
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  console.log("ini array", arrayData);
  console.log("ini bobot", bobot);
  console.log("ini tipe", tipe);

  useEffect(() => {
    fetchPenilaian();
  }, []);

  const handleSubmit = ()=>{
    
  }


  return (
    <Layout>
      <section className="flex justify-between">
        <Title title="Buat Analisis" />
        <form onSubmit={handleSubmit}>
          <Button onClick={() => setShowModal(true)}>Buat Analisis</Button>
        </form>
      </section>
    </Layout>
  );
}
