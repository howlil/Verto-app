import Layout from "@/components/Layout";
import Title from "@/components/ui/Title";
import Button from "@/components/ui/Button";
export default function HasilAnalisis() {
  return (
    <Layout>
      <section className="flex justify-between">
        <Title title="Buat Analisis" />
        <Button onClick={() => setShowModal(true)}>Buat Analisis</Button>
      </section>
    </Layout>
  );
}
