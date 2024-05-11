const express = require('express');
const router = express.Router();
const alternatifController = require('../controllers/alternatifController');
// const auth = require('../middlewares/auth');

// router.post('/addAlternatif',auth, alternatifController.createAlternatif);
// router.get('/getAllAlternatif',auth, alternatifController.getAllAlternatif);
// router.get('/getAlternatifById/:id',auth, alternatifController.getAlternatifById);
// router.put('/editAlternatif/:id',auth, alternatifController.updateAlternatif);
// router.delete('/deleteAlternatif/:id',auth, alternatifController.deleteAlternatif);

router.post('/addAlternatif',alternatifController.createAlternatif);
router.get('/getAllAlternatif', alternatifController.getAllAlternatif);
router.get('/getAlternatifById/:id', alternatifController.getAlternatifById);
router.put('/editAlternatif/:id', alternatifController.updateAlternatif);
router.delete('/deleteAlternatif/:id', alternatifController.deleteAlternatif);
module.exports = router;
