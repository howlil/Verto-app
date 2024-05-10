import { card } from "@/data/card";
export default function CardHome() {
  return (
    <div className="flex justify-center my-16">
      {card.map((item, index) => (
        <Card key={index} img={item.img} nama={item.nama} nim={item.nim} />
      ))}
    </div>
  )
}

 function Card({ img,nama,nim }) {
  return (
    <div>
      <img className="w-56" src={img} alt="img" />
      <section className="text-center">
        <h2 className="text-xl font-medium text-neutral-800 ">{nama}</h2>
        <h1 className="text-lg text-neutral-500">{nim}</h1>
      </section>
    </div>
  );
}
