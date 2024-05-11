import Layout from "@/components/Layout";
import Title from "@/components/ui/Title";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import AddNilaiKriteria from "./addNilaiKriteria";
import getNilaiKriteria from "./api/getNilaiKriteria";
import { useState, useEffect } from "react";

export default function NilaiKriteria() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

const fetchData = async () => {
  const result = await getNilaiKriteria();
  setData(result.data.details);
};

  const handleEdit = (id) => {
    console.log("Edit", id);
  };

  const handleDelete = (id) => {
    console.log("Delete", id);
  };

  return (
    <Layout>
      <section className="flex justify-between">
        <Title title="Nilai Kriteria" />
        <Button onClick={openModal}>Nilai Kriteria</Button>
      </section>
      <section className="mt-8">
        <Table
          columns={columns}
          data={data}
          onEdit={(id) => handleEdit(id)}
          onDelete={(id) => handleDelete(id)}
        />
      </section>
      {isModalOpen && <AddNilaiKriteria onClose={closeModal} refreshData={fetchData} />}    </Layout>
  );
}

const columns = [
  { header: "Kriteria", accessor: "Kriteria.nama" },
  { header: "Deskripsi", accessor: "deskripsi" },
  { header: "Nilai", accessor: "nilai" },
];
