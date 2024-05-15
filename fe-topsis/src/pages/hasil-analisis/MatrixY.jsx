import getAnalisis from "./api/getAnalisis";
import getAlternatif from "../alternatif/apis/getAlternatif";
import getKriteria from "../kriteria/api/getKriteria";
import { useState, useEffect } from "react";
import { Table } from "lucide-react";

export default function MatrixY() {
  const [alternatifs, setAlternatifs] = useState([]);
  const [kriterias, setKriterias] = useState([]);
  const [normalizedMatrix, setNormalizedMatrix] = useState([]);

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

    const fetchAnalisis = async () => {
      try {
        const response = await getAnalisis();
        console.log("response", response.result[0].weightedNormalizedMatrix);
        if (
          response &&
          response.result &&
          response.result[0].weightedNormalizedMatrix
        ) {
          setNormalizedMatrix(response.result[0].weightedNormalizedMatrix);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchAlternatif();
    fetchKriteria();
    fetchAnalisis();
  }, []);

  return (
    <>
      <section className="my-8 overflow-auto">
        <section className="flex gap-3 items-center">
          <Table color="orange" />
          <h1 className="my-4 text-2xl font-semibold text-amber-500">
            Matrix Y
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
            {normalizedMatrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="text-start border-b px-4 py-2 ">
                  {alternatifs[rowIndex]}
                </td>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border-b text-center px-4 py-2"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
