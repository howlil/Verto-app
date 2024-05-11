import Layout from "@/components/Layout";
import Title from "@/components/ui/Title";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import AddAlternatif from "./addAlternatif";
import { useState, useEffect } from "react";
import getAlternatif from "./apis/getAlternatif";

export default function Alternatif() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const data = await getAlternatif();
    setData(data.data.alternatifs);
  };

  useEffect(() => {
    fetchData();
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
        <Title title="Buat Alternatif" />
        <Button onClick={() => setShowModal(true)}>tambah Alternatif</Button>
      </section>
      <section className="mt-8">
        <Table
          columns={columns}
          data={data}
          onEdit={(id) => handleEdit(id)}
          onDelete={(id) => handleDelete(id)}
        />
      </section>
      {showModal && (
        <AddAlternatif
          onClose={() => setShowModal(false)}
          refreshData={fetchData}
        />
      )}
    </Layout>
  );
}

const columns = [{ header: "Nama", accessor: "nama" }];
