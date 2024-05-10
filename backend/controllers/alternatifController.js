const prisma = require('../config/prisma');


exports.createAlternatif = async (req, res) => {
    const { nama, deskripsi } = req.body;

    if (!nama || typeof nama !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid or missing name' });
    }

    try {
        const newAlternatif = await prisma.alternatif.create({
            data: { nama, deskripsi }
        });
     return   res.status(201).json({ success: true, message: "Alternatif created successfully", data: {newAlternatif} });
    } catch (error) {
      return  res.status(500).json({ success: false, message: 'Failed to create Alternatif', error: error.message });
    }
};

exports.getAllAlternatif = async (req, res) => {
    try {
        const alternatifs = await prisma.alternatif.findMany();
     return   res.status(200).json({ success: true, message: "All Alternatifs retrieved successfully", data: {alternatifs} });
    } catch (error) {
     return   res.status(500).json({ success: false, message: 'Failed to get Alternatifs', error: error.message });
    }
};

exports.getAlternatifById = async (req, res) => {
    const { id } = req.params;

    try {
        const alternatif = await prisma.alternatif.findUnique({
            where: { id }
        });
        if (alternatif) {
            return res.status(200).json({ success: true, message: "Alternatif retrieved successfully", data: {alternatif} });
        } else {
           return  res.status(404).json({ success: false, message: 'Alternatif not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get Alternatif', error: error.message });
    }
};

exports.updateAlternatif = async (req, res) => {
    const { id } = req.params;
    const { nama, deskripsi } = req.body;

    try {
        const updatedAlternatif = await prisma.alternatif.update({
            where: { id },
            data: { nama, deskripsi }
        });
       return res.status(200).json({ success: true, message: "Alternatif updated successfully", data: {updatedAlternatif} });
    } catch (error) {
       return res.status(500).json({ success: false, message: 'Failed to update Alternatif', error: error.message });
    }
};

exports.deleteAlternatif = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.alternatif.delete({
            where: { id }
        });
       return res.status(204).json({ success: true, message: 'Alternatif deleted successfully' });
    } catch (error) {
       return res.status(500).json({ success: false, message: 'Failed to delete Alternatif', error: error.message });
    }
};