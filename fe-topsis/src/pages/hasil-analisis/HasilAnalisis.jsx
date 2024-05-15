import Layout from "@/components/Layout";
import Title from "@/components/ui/Title";
import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";
import getPenilaian from "../penilaian/apis/getPenilaian";
import addAnalisis from "./api/addAnalisis";
import getAlternatif from "../alternatif/apis/getAlternatif";
import getKriteria from "../kriteria/api/getKriteria";
import { Table } from "lucide-react";
import MatrixR from "./MatrixR";
import MatrixY from "./MatrixY";
import SolusiAplus from "./SolusiAplus";
import SolusiAmin from "./SolusiAmin";
import JarakSplus from "./JarakSplus";
import JarakSmin from "./JarakSmin";
import PerfomanceScore from "./PerfomanceScore";

export default function HasilAnalisis() {
  const [arrayData, setArrayData] = useState([]);
  const [bobot, setBobot] = useState([]);
  const [tipe, setTipe] = useState([]);
  const [penilaian, setPenilaian] = useState([]);
  const [alternatifs, setAlternatifs] = useState([]);
  const [kriterias, setKriterias] = useState([]);

  const fetchPenilaian = async () => {
    try {
      const response = await getPenilaian();
      const fetchedData = response.data;

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

      // Convert criteriaWeights map to an array of bobot
      const criteriaWeightsArray = Object.values(criteriaWeights);
      setBobot(criteriaWeightsArray);

      // Convert criteriaTypes map to an array of tipe
      const criteriaTypesArray = Object.values(criteriaTypes);
      setTipe(criteriaTypesArray);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // console.log("ini array", arrayData);
  // console.log("ini bobot", bobot);
  // console.log("ini tipe", tipe);

  useEffect(() => {
    fetchPenilaian();
  }, []);

  const postData = async () => {
    try {
      const result = await addAnalisis({ arrayData, bobot, tipe });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postData();
  };

  const showMatrix = async () => {
    const response = await getPenilaian();
    if (response.message === "All penilaians fetched successfully") {
      setPenilaian(response.data);
    }
  };

  useEffect(() => {
    const fetchAlternatif = async () => {
      const response = await getAlternatif();
      if (response.success) {
        setAlternatifs(response.data.alternatifs.map((item) => item.nama));
      }
    };

    const fetchKriteria = async () => {
      const response = await getKriteria();
      if (response.success) {
        setKriterias(response.data.kriteria.map((item) => item.nama));
      }
    };

    fetchAlternatif();
    fetchKriteria();
    showMatrix();
  }, []);

  const matrix = alternatifs.map((alt) => {
    const row = { Alternatif: alt };
    kriterias.forEach((krit) => {
      const item = penilaian.find(
        (p) => p.Alternatif.nama === alt && p.Kriteria.nama === krit
      );
      row[krit] = item ? item.DetailKriteria.nilai : "-";
    });
    return row;
  });

  return (
    <Layout>
      <section className="flex justify-between">
        <Title title="Buat Analisis" />
        <form onSubmit={handleSubmit}>
          <Button>Buat Analisis</Button>
        </form>
      </section>
      <section className="my-8">
        <section className="flex gap-3 items-center">
          <Table color="orange" />
          <h1 className="my-4 text-2xl font-semibold text-amber-500">
            Matrix Keputusan
          </h1>
        </section>
        <table className="table-auto w-full">
          <thead className="bg-orange-50">
            <tr>
              <th className="text-start px-4 py-2">Alternatif / Kriteria</th>
              {kriterias.map((krit) => (
                <th key={krit} className="px-4 py-2">
                  {krit}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                <td className="border-b text-start px-4 py-2">
                  {row.Alternatif}
                </td>
                {kriterias.map((krit) => (
                  <td key={krit} className="border-b text-center px-4 py-2">
                    {row[krit]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <MatrixR />
      <MatrixY />
      <SolusiAplus />
      <SolusiAmin />
      <JarakSplus />
      <JarakSmin />
      <PerfomanceScore/>
      
    </Layout>
  );
}
