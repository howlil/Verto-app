import Navbar from "@/components/Navbar";
import Avatars from "@/components/Avatar";
import aul from "/public/aulaa.svg";
import wul from "/public/wul.svg";
import ok from "/public/ok.svg";
import tri from "/public/trii.svg";

export default function Home() {
  return (
    <>
      <main className="  px-40">
        <Navbar />
        <section className="w-full text-center mt-12 flex flex-col gap-4">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-4xl ">TUGAS BESAR</h1>
            <hr className="border-b-4 w-24 border-amber-300" />
          </div>
          <h3 className="font-medium text-xl leading-tight">
            Optimalisasi Pemilihan Key Opinion Leader untuk <br />
            Peningkatan Marketing F&B dengan Metode TOPSIS dalam <br />
            Sistem Penunjang Keputusan
          </h3>
          <h2 className="text-2xl font-semibold">Kelompok 6</h2>
        </section>
        <section className="flex my-16 justify-evenly">
          <Avatars src={aul} name="Mhd Ulil Abshar" nim="2211521003" />
          <Avatars src={tri} name="Tri Ayunia Patma Lubis" nim="2011522010" />
          <Avatars src={ok} name="Oktaviani Andrianti" nim="2211522015" />
          <Avatars src={wul} name="Wulandari Yulianis" nim="2211523001" />
        </section>
        <div className="overflow-hidden">
          <div className="absolute bottom-auto -left-12 top-0 h-[500px] w-[500px] translate-x-[-30%] translate-y-[20%] rounded-full bg-[#FFE3BD] -z-10 opacity-50 blur-[90px]" />
          <div className="absolute bottom-auto right-20 -top-96 h-[500px] w-[500px] translate-x-[-30%] translate-y-[20%] rounded-full bg-[#FFE3BD] -z-10 opacity-50 blur-[90px]" />
          <div className="absolute -right-32 -bottom-32 h-[500px] w-[500px] translate-x-[-30%] translate-y-[20%] rounded-full bg-[#FFE3BD] -z-10 opacity-60 blur-[90px]" />
        </div>
      </main>
    </>
  );
}
