import getAnalisis from "./api/getAnalisis";
import getKriteria from "../kriteria/api/getKriteria";
import { useState, useEffect } from "react";
import { Table } from "lucide-react";

export default function SolusiAmin() {
  const [kriterias, setKriterias] = useState([]);
  const [normalizedMatrix, setNormalizedMatrix] = useState([]);

  useEffect(() => {
    const fetchKriteria = async () => {
      const response = await getKriteria();
      if (response.success) {
        setKriterias(response.data.kriteria.map((item) => item.nama));
      }
    };

    const fetchAnalisis = async () => {
      try {
        const response = await getAnalisis();
        console.log("====================================");
        console.log(response);
        console.log("====================================");
        if (
          response &&
          response.result &&
          response.result[0].weightedNormalizedMatrix
        ) {
          setNormalizedMatrix([response.result[0].negativeIdealSolution]);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchKriteria();
    fetchAnalisis();
  }, []);

  return (
    <>
      <section className="my-8 overflow-auto">
        <section className="flex gap-3 items-center">
          <Table color="orange" />
          <h1 className="my-4 text-2xl font-semibold text-amber-500">
            Solusi Ideal Negatif (A-)
          </h1>
        </section>

        <table className="table-auto w-full">
          <thead className="bg-orange-50">
            <tr>
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
