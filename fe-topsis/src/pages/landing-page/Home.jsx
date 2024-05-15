import Navbar from "@/components/navbar";
import CardHome from "@/components/ui/CardHome";
export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute w-[400px] h-[400px] bg-orange-300 opacity-70 rounded-full -top-64 right-96 blur-[150px] -z-10"></div>
      <div className="absolute w-[600px] h-[600px] bg-orange-300 opacity-70 rounded-full -bottom-46 -left-72 blur-[200px] -z-10"></div>
      <div className="absolute w-[800px] h-[800px] bg-orange-300 opacity-70 rounded-full -bottom-96 -right-72 blur-[200px] -z-10"></div>
      <Navbar />
      <section className="text-center flex flex-col mt-8 items-center gap-1">
        <h1 className="font-bold text-4xl text-neutral-800  ">TUGAS BESAR</h1>
        <hr className="border-b-4 w-1/12 flex border-orange-300" />
      </section>
      <section className="text-center flex flex-col mt-4 items-center gap-1">
        <h3 className=" text-neutral-700 text-2xl leading-normal">
          Pembangunan Aplikasi Sistem Penunjang Keputusan untuk <br />
          Menentukan Influencer Ideal dalam Strategi Marketing <br />
          Resto X Menggunakan Metode TOPSIS
        </h3>
        <h2 className="font-semibold text-lg ">Kelompok 6</h2>
      </section>
      <CardHome />
    </div>
  );
}
