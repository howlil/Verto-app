import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Title from "@/components/ui/Title";
import Button from "@/components/ui/Button";
import AddPenilaian from "./addPenilaian";
import getPenilaian from "./apis/getPenilaian";
import getAlternatif from "../alternatif/apis/getAlternatif";
import getKriteria from "../kriteria/api/getKriteria";

export default function Penilaian() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [alternatifs, setAlternatifs] = useState([]);
  const [kriterias, setKriterias] = useState([]);
  const [penilaian, setPenilaian] = useState([]);

  const fetchPenilaian = async () => {
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
    fetchPenilaian();
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
        <Title title="Buat Penilaian" />
        <Button onClick={() => setShowModal(true)}>Tambah Penilaian</Button>
      </section>
      <section className="mt-8">
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
                <td className="border-b text-start text-center px-4 py-2">
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
      {showModal && (
        <AddPenilaian
          onClose={() => setShowModal(false)}
          refreshData={fetchPenilaian}
        />
      )}
    </Layout>
  );
}
