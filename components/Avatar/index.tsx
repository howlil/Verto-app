import Image from "next/image";

interface avatar {
  src: string;
  name: string;
  nim: string;
}

export default function Avatars({ src, name, nim }: avatar) {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={src}
        width={200}
        height={200}
        className="rounded-md"
        alt="gmbar"
      />
      <figcaption className="text-center">
        <h1 className="text-lg font-semibold text-slate-700 ">{name}</h1>
        <p className="text-sm text-gray-400 font-medium">{nim}</p>
      </figcaption>
    </div>
  );
}
