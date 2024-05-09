const prisma = require('../config/prisma');

exports.createKriteria = async (req, res) => {
    const { nama, bobot } = req.body;
    if (!nama || typeof nama !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing name. Name must be a non-empty string.' });
    }
    if (bobot === undefined || typeof bobot !== 'number') {
        return res.status(400).json({ message: 'Invalid or missing weight. Weight must be a number.' });
    }
    if (isNaN(bobot)) {
        return res.status(400).json({ message: 'Weight must be a valid number and not NaN.' });
    }
    try {
        const isKriteria = await prisma.kriteria.findFirst({
            where:{
                nama : nama,
            }
        })
        if(isKriteria){
          return  res.status(400).json({message:"kriteria sudah ada"});
        }
        else{
            const kriteria = await prisma.kriteria.create({
                data: { nama, bobot }
            });
            res.status(201).json(kriteria);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};


exports.getKriteria = async (req, res) => {
    try {
        const kriteria = await prisma.kriteria.findMany();
        res.json(kriteria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getKriteriaById = async (req, res) => {
    const { id } = req.params;
    try {
        const kriteria = await prisma.kriteria.findUnique({
            where: { 
                id 
          }
        });
        if (kriteria) {
            res.json(kriteria);
        } else {
            res.status(404).json({ message: 'Kriteria not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateKriteria = async (req, res) => {
    const { id } = req.params;
    const { nama, bobot } = req.body;
    if (nama && typeof nama !== 'string') {
        return res.status(400).json({ message: 'Invalid name' });
    }
    if (bobot && typeof bobot !== 'number') {
        return res.status(400).json({ message: 'Invalid weight' });
    }
    try {
        const kriteria = await prisma.kriteria.update({
            where: { id },
            data: { nama, bobot }
        });
        res.json(kriteria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteKriteria = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.kriteria.delete({
            where: { id }
        });
        res.status(200).json({message:"berhasil menghapus kriteria"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};