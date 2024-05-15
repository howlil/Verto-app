import getAnalisis from "./api/getAnalisis";
import { useState, useEffect } from "react";
import { Table } from "lucide-react";

export default function JarakSmin() {
  const [normalizedMatrix, setNormalizedMatrix] = useState([]);

  useEffect(() => {
    const fetchAnalisis = async () => {
      try {
        const response = await getAnalisis();
        if (
          response &&
          response.result &&
          response.result[0].distancesToIdeal
        ) {
          setNormalizedMatrix([response.result[0].distancesToNegativeIdeal]);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchAnalisis();
  }, []);

  return (
    <>
      <section className="my-8 overflow-auto">
        <section className="flex gap-3 items-center">
          <Table color="orange" />
          <h1 className="my-4 text-2xl font-semibold text-amber-500">
            Solusi Jarak Ideal Negatif (D-)
          </h1>
        </section>

        <table className="table-auto w-full">
          <thead className="bg-orange-50">
            <tr>
              {normalizedMatrix[0]?.map((_, index) => (
                <th key={index} className="px-4 py-2">
                  D{index + 1}-
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
