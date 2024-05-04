import { prisma } from "@/lib/prisma";
import { NextApiRequest,NextApiResponse } from "next";


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method === "GET") {
    try {
      const alternatifs = await prisma.alternatif.findMany();
      res.status(200).json(alternatifs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch alternatifs" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
