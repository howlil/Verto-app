import getAnalisis from "./api/getAnalisis";
import { useState, useEffect } from "react";
import getPenilaian from "../penilaian/apis/getPenilaian";
import { Table } from "lucide-react";
export default function PerfomanceScore() {
  const [penilaian, setPenilaian] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchNilai = async () => {
      try {
        const res = await getPenilaian();
        if (res && res.data) {
          const obj = res.data.reduce((acc, item) => {
            if (!acc[item.Alternatif.nama]) {
              acc[item.Alternatif.nama] = [];
            }
            acc[item.Alternatif.nama].push(item.DetailKriteria.nilai);
            return acc;
          }, {});
          setPenilaian(obj);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    const fetchAnalisis = async () => {
      try {
        const response = await getAnalisis();
        if (response && response.data) {
          const newData = response.data.map((item) => {
            const alternativeName = Object.keys(penilaian).find(
              (key) =>
                JSON.stringify(penilaian[key]) ===
                JSON.stringify(item.alternative)
            );
            return {
              alternativeName,
              score: item.score,
            };
          });
          setData(newData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchAnalisis();
    fetchNilai();
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  }, [data]);

  const sortedData = [...data].sort((a, b) => b.score - a.score);

  return (
    <>
      <section className="my-8">
        <section className="flex gap-3 items-center">
          <Table color="orange" />
          <h1 className="my-4 text-2xl font-semibold text-amber-500">
            Hail Analisis
          </h1>
        </section>

        <table className="table-auto w-full">
          <thead className="bg-orange-50">
            <tr>
              <th>NO</th>
              <th className="text-start">Alternative Name</th>
              <th className="text-start">Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td>{item.alternativeName}</td>
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
