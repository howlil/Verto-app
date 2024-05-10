import Layout from "@/components/Layout";
import Title from "@/components/ui/Title";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
export default function Kriteria() {
  return (
    <Layout>
      <section className="flex justify-between">
        <Title title="Buat Kriteria" />
        <Button>tambah Kriteria</Button>
      </section>
      <section className="mt-8">
        <Table columns={columns} data={data} />
      </section>
    </Layout>
  );
}
const columns = [
  { header: 'ID', accessor: 'id' },
  { header: 'Name', accessor: 'name' },
  { header: 'Age', accessor: 'age' },
  { header: 'City', accessor: 'city' }
];

const data = [
  { id: 1, name: 'John Doe', age: 30, city: 'New York' },
  { id: 2, name: 'Jane Doe', age: 25, city: 'Los Angeles' },
  { id: 3, name: 'William Smith', age: 28, city: 'Chicago' },
  // Add more data as needed
];
