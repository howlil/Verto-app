import Layout from "@/components/Layout";
import Title from "@/components/ui/Title";
import Table from "@/components/ui/Table";
import AddKriteria from "./addKriteria";
import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";
import getKriteria from "./api/getKriteria";

export default function Kriteria() {
  const [kriteria, setKriteria] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchKriteria = async () => {
      const data = await getKriteria(); 
      setKriteria(data.data.kriteria);
    };

    fetchKriteria();
  }, []);

   const handleEdit = (id) => {
    console.log("Edit", id);
  };

  const handleDelete = (id) => {
    console.log("Delete", id);
  };

  return (
    <Layout>
      <section className="flex justify-between">
        <Title title="Buat Kriteria" />
        <Button onClick={() => setShowModal(true)}>Tambah Kriteria</Button>
      </section>
      {showModal && <AddKriteria onClose={() => setShowModal(false)} />} 
      <section className="mt-8">
        <Table 
        columns={columns} 
        data={kriteria}
        onEdit={(id) => handleEdit(id)} 
        onDelete={(id) => handleDelete(id)} 
    
        />
      </section>
    </Layout>
  );
}

const columns = [
  { header: 'Kriteria', accessor: 'nama' },
  { header: 'Bobot', accessor: 'bobot' },
];