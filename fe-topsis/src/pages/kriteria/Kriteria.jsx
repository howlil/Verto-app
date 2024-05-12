import Layout from "@/components/Layout";
import Title from "@/components/ui/Title";
import Table from "@/components/ui/Table";
import AddKriteria from "./addKriteria";
import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";
import getKriteria from "./api/getKriteria";
import hapusKriteria from "./api/hapusKriteria";
import ModalDelete from "@/components/ui/ModalDelete";

export default function Kriteria() {
  const [kriteria, setKriteria] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchKriteria = async () => {
    const data = await getKriteria();
    setKriteria(data.data.kriteria);
  };

  useEffect(() => {
    fetchKriteria();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit", id);
  };

  const handleDelete = async () => {
    try {
      console.log("Delete", deleteId);
      await hapusKriteria({ id: deleteId });
      fetchKriteria();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <Layout>
      <section className="flex justify-between">
        <Title title="Buat Kriteria" />
        <Button onClick={() => setShowModal(true)}>Tambah Kriteria</Button>
      </section>
      {showModal && (
        <AddKriteria
          onClose={() => setShowModal(false)}
          refreshData={fetchKriteria}
        />
      )}
      {showDeleteModal && (
        <ModalDelete
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
      <section className="mt-8">
        <Table
          columns={columns}
          data={kriteria}
          onEdit={(row) => handleEdit(row.id)}
          onDelete={(row) => {
            setDeleteId(row.id);
            setShowDeleteModal(true);
          }}
        />
      </section>
    </Layout>
  );
}

const columns = [
  { header: "Kriteria", accessor: "nama" },
  { header: "Bobot", accessor: "bobot" },
  { header: "Tipe", accessor: "tipe" },
];
