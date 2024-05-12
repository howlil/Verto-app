const prisma = require('../config/prisma');

exports.createKriteria = async (req, res) => {
    const { nama, bobot,tipe } = req.body;
    if (!nama || typeof nama !== 'string') {
        return res.status(400).json({success:false, message: 'Invalid or missing name. Name must be a non-empty string.' });
    }
    if (bobot === undefined || typeof bobot !== 'number') {
        return res.status(400).json({success:false, message: 'Invalid or missing weight. Weight must be a number.' });
    }
    if (isNaN(bobot)) {
        return res.status(400).json({success:false, message: 'Weight must be a valid number and not NaN.' });
    }
    
    if (!tipe || (tipe !== 'COST' && tipe !== 'BENEFIT')) {
        return res.status(400).json({ success: false, message: 'Invalid or missing type. Type must be either "COST" or "BENEFIT".' });
    }

    try {
        const isKriteria = await prisma.kriteria.findFirst({
            where:{
                nama : nama,
            }
        })
        if(isKriteria){
          return  res.status(400).json({success:false,message:"kriteria sudah ada"});
        }
        else{
            const kriteria = await prisma.kriteria.create({
                data: { nama, bobot ,tipe}
            });
           return res.status(201).json({success:true,message:"berhasil",data:{kriteria}});
        }
    } catch (error) {
       return res.status(500).json({ success:false,message: 'Server error: ' + error.message });
    }
};


exports.getKriteria = async (req, res) => {
    try {
        const kriteria = await prisma.kriteria.findMany();
        return res.status(200).json({success:true,message:"kriteria ada",data:{kriteria}});
    } catch (error) {
        return res.status(500).json({success:false, message: error.message });
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
            return res.status(200).json({success:true,message:"berhasiil" ,data:{kriteria}});
        } else {
            return res.status(404).json({success:false, message: 'Kriteria not found' });
        }
    } catch (error) {
       return  res.status(500).json({success:false, message: error.message });
    }
};
exports.updateKriteria = async (req, res) => {
    const { id } = req.params;
    const { nama, bobot } = req.body;
    if (nama && typeof nama !== 'string') {
        return res.status(400).json({success:false, message: 'Invalid name' });
    }
    if (bobot && typeof bobot !== 'number') {
        return res.status(400).json({success:false, message: 'Invalid weight' });
    }
    if (tipe && tipe !== 'COST' && tipe !== 'BENEFIT') {
        return res.status(400).json({ success: false, message: 'Invalid type. Type must be either "COST" or "BENEFIT".' });
    }
    try {
        const kriteria = await prisma.kriteria.update({
            where: { id },
            data: { nama, bobot, tipe }
        });
       return res.status(200).json({success:true,message:"berhasil update" ,data:{kriteria}});
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'No such kriteria found.' });
        }
        return res.status(500).json({ success: false, message: error.message });
       }
};

exports.deleteKriteria = async (req, res) => {
    const { id } = req.params;
    try {
      const kriteria = await prisma.kriteria.findUnique({ where: { id } });
      if (!kriteria) {
        res.status(404).json({ error: "Kriteria not found" });
        return;
      }
      await prisma.kriteria.delete({ where: { id } });
      res.status(200).json({ message: "Kriteria deleted successfully" });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ error: "An error occurred while deleting the kriteria" });
    }
  };