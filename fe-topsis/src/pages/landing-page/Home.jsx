import  Navbar  from "@/components/navbar";
import CardHome from "@/components/ui/CardHome";
export default function Home() {
  return (
    <div>
      <Navbar />
      <section className="text-center flex flex-col mt-8 items-center gap-1">
        <h1 className="font-bold text-4xl text-neutral-800  ">TUGAS BESAR</h1>
        <hr  className="border-b-4 w-1/12 flex border-orange-300" />
      </section>
      <section className="text-center flex flex-col mt-4 items-center gap-1">
        <h3 className=" text-neutral-700 text-2xl leading-normal">
          Pembangunan Aplikasi Sistem Penunjang Keputusan untuk <br />
          Menentukan Influencer Ideal dalam Strategi Marketing <br />
          Resto X Menggunakan Metode TOPSIS
        </h3>
        <h2 className="font-semibold text-lg ">Kelompok 6</h2>
      </section>
        <CardHome/>
    </div>
  );
}
