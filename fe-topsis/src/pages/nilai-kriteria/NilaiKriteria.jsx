import Layout from "@/components/Layout";
import Title from "@/components/ui/Title";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import AddNilaiKriteria from "./addNilaiKriteria";
import getNilaiKriteria from "./api/getNilaiKriteria";
import { useState, useEffect } from "react";
import deleteDetailKriteria from "./api/deleteDetailKriteria";
import ModalDelete from "@/components/ui/ModalDelete";

export default function NilaiKriteria() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idDK, setIdDk] = useState("");
  const [data, setData] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
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

  const handleDelete = async () => {
    if (idDK) {
      await deleteDetailKriteria({ id: idDK });
      fetchData();
      closeDeleteModal();
    }
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
          onDelete={(row) => {
            setIdDk(row.id);
            setIsDeleteModalOpen(true);
          }}
        />
      </section>
      {isModalOpen && (
        <AddNilaiKriteria onClose={closeModal} refreshData={fetchData} />
      )}
      {isDeleteModalOpen && (
        <ModalDelete onClose={closeDeleteModal} onDelete={handleDelete} />
      )}
    </Layout>
  );
}

const columns = [
  { header: "Kriteria", accessor: "Kriteria.nama" },
  { header: "Deskripsi", accessor: "deskripsi" },
  { header: "Nilai", accessor: "nilai" },
];
