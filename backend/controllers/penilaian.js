const prisma = require('../config/prisma');

exports.createPenilaian = async (req, res) => {
    try {
        const { id_detail_kriteria, id_kriteria, id_alternatif } = req.body;
        
        if (!id_detail_kriteria || !id_kriteria || !id_alternatif) {
            return res.status(400).json({ message: "All fields are required", data: {} });
        }

        // Check if id_detail_kriteria exists in the detail_kriteria table
        const detailKriteria = await prisma.detailKriteria.findUnique({
            where: { id: id_detail_kriteria },
        });

        if (!detailKriteria) {
            return res.status(400).json({ message: "Invalid id_detail_kriteria", data: {} });
        }

        // Check if id_kriteria exists in the kriteria table
        const kriteria = await prisma.kriteria.findUnique({
            where: { id: id_kriteria },
        });

        if (!kriteria) {
            return res.status(400).json({ message: "Invalid id_kriteria", data: {} });
        }

        // Check if id_alternatif exists in the alternatif table
        const alternatif = await prisma.alternatif.findUnique({
            where: { id: id_alternatif },
        });

        if (!alternatif) {
            return res.status(400).json({ message: "Invalid id_alternatif", data: {} });
        }

        const existingPenilaian = await prisma.penilaian.findMany({
            where: {
                id_alternatif,
                id_kriteria,
            },
        });

        if (existingPenilaian.length > 0) {
            return res.status(400).json({ message: "Alternatif can only have one detailKriteria in one kriteria", data: {} });
        }

        const penilaian = await prisma.penilaian.create({
            data: {
                id_detail_kriteria,
                id_kriteria,
                id_alternatif,
            },
        });
        res.status(200).json({ message: "Penilaian created successfully", data: penilaian });
    } catch (error) {
        res.status(500).json({ message: error.message, data: {} });
    }
};

exports.getAllPenilaian = async (req, res) => {
    try {
        const penilaians = await prisma.penilaian.findMany({
            include: {
                DetailKriteria: {
                    select: {
                        nilai: true,
                        deskripsi: true
                    }
                },
                Alternatif: {
                    select: {
                        nama: true
                    }
                },
                Kriteria: {
                    select: {
                        nama: true,
                        tipe: true,
                        bobot: true
                    }
                }
            }
        });
        res.status(200).json({ message: "All penilaians fetched successfully", data: penilaians });
    } catch (error) {
        res.status(500).json({ message: error.message, data: {} });
    }
};

exports.getPenilaianById = async (req, res) => {
    try {
        const { id } = req.params;
        const penilaian = await prisma.penilaian.findUnique({
            where: { id },
            include: {
                DetailKriteria: {
                    select: {
                        nilai: true,
                        deskripsi: true
                    }
                },
                Alternatif: {
                    select: {
                        nama: true
                    }
                },
                Kriteria: {
                    select: {
                        nama: true,
                        tipe: true,
                        bobot: true
                    }
                }
            }
        });
        if (penilaian) {
            res.status(200).json({ message: "Penilaian fetched successfully", data: penilaian });
        } else {
            res.status(404).json({ message: "Penilaian not found", data: {} });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, data: {} });
    }
};

exports.updatePenilaian = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_detail_kriteria, id_kriteria, id_alternatif } = req.body;
        const penilaian = await prisma.penilaian.update({
            where: { id },
            data: {
                id_detail_kriteria,
                id_kriteria,
                id_alternatif,
            },
            include: {
                DetailKriteria: {
                    select: {
                        nilai: true,
                        deskripsi: true
                    }
                },
                Alternatif: {
                    select: {
                        nama: true
                    }
                },
                Kriteria: {
                    select: {
                        nama: true
                    }
                }
            }
        });
        res.status(200).json({ message: "Penilaian updated successfully", data: penilaian });
    } catch (error) {
        res.status(500).json({ message: error.message, data: {} });
    }
};
exports.deletePenilaian = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.penilaian.delete({
            where: { id },
        });
        res.status(200).json({ message: "Penilaian deleted successfully", data: {} });
    } catch (error) {
        res.status(500).json({ message: error.message, data: {} });
    }
};