const express = require('express');
const router = express.Router();
const Penilaian = require('../controllers/penilaian');
// const auth = require('../middlewares/auth')

router.post('/addPenilaian', Penilaian.createPenilaian);
router.get('/getPenilaian',Penilaian.getAllPenilaian);
router.get('/getPenilaianById/:id', Penilaian.getPenilaianById);
router.put('/editPenilaian/:id', Penilaian.updatePenilaian);
router.delete('/deletePenilaian/:id', Penilaian.deletePenilaian);

// router.post('/addPenilaian',auth, Penilaian.createPenilaian);
// router.get('/getPenilaian',auth, Penilaian.getAllPenilaian);
// router.get('/getPenilaianById/:id',auth, Penilaian.getPenilaianById);
// router.put('/editPenilaian/:id',auth, Penilaian.updatePenilaian);
// router.delete('/deletePenilaian/:id',auth, Penilaian.deletePenilaian);


module.exports = router;