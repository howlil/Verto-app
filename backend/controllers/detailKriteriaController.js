const prisma = require("../config/prisma");

exports.createDetailKriteria = async (req, res) => {
    const { id_kriteria, deskripsi, nilai } = req.body;

    try {
        if (!id_kriteria || typeof id_kriteria !== 'string') {
            return res.status(400).json({ success: false, message: 'Invalid or missing Kriteria ID' });
        }
        if (!deskripsi || typeof deskripsi !== 'string') {
            return res.status(400).json({ success: false, message: 'Invalid or missing description' });
        }
        if (nilai === undefined || typeof nilai !== 'number') {
            return res.status(400).json({ success: false, message: 'Invalid or missing value' });
        }
        if (isNaN(nilai)) {
            return res.status(400).json({success:false, message: 'Weight must be a valid number and not NaN.' });
        }

        const isDetail = await prisma.detailKriteria.findFirst({
            where: {
                AND: [
                    { id_kriteria: id_kriteria },
                    { deskripsi: deskripsi }
                ]
            }
        });

        if (isDetail) {
            return res.status(400).json({ success: false, message: 'DetailKriteria already exists' });
        }

        const newDetail = await prisma.detailKriteria.create({
            data: { id_kriteria, deskripsi, nilai }
        });
       return res.status(201).json({ success: true, message: "Detail Kriteria created successfully", data: {newDetail} });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to create DetailKriteria', error: error.message });
    }
};

exports.getAllDetailKriteria = async (req, res) => {
    try {
        const details = await prisma.detailKriteria.findMany();
        return   res.status(200).json({ success: true, message: "All DetailKriteria retrieved successfully", data: {details} });
    } catch (error) {
        return  res.status(500).json({ success: false, message: 'Failed to get DetailKriteria', error: error.message });
    }
};

exports.getDetailKriteriaById = async (req, res) => {
    const { id } = req.params;
    try {
        const detail = await prisma.detailKriteria.findUnique({
            where: { id }
        });
        if (detail) {
            return    res.status(200).json({ success: true, message: "DetailKriteria retrieved successfully", data: {detail} });
        } else {
            return     res.status(404).json({ success: false, message: 'DetailKriteria not found' });
        }
    } catch (error) {
        return    res.status(500).json({ success: false, message: 'Failed to get DetailKriteria', error: error.message });
    }
};

exports.updateDetailKriteria = async (req, res) => {
    const { id } = req.params;
    const { deskripsi, nilai } = req.body;

    try {
        const updatedDetail = await prisma.detailKriteria.update({
            where: { id },
            data: { deskripsi, nilai }
        });
       return  res.status(200).json({ success: true, message: "DetailKriteria updated successfully", data: {updatedDetail} });
    } catch (error) {
       return  res.status(500).json({ success: false, message: 'Failed to update DetailKriteria', error: error.message });
    }
};

exports.deleteDetailKriteria = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.detailKriteria.delete({
            where: { id }
        });
       return  res.status(204).json({ success: true, message: 'DetailKriteria deleted successfully' });
    } catch (error) {
       return  res.status(500).json({ success: false, message: 'Failed to delete DetailKriteria', error: error.message });
    }
};
