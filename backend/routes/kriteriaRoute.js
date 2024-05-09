const kriteriaController = require("../controllers/kriteriaController")
const express = require('express');
const router = express.Router();
 const auth  = require('../middlewares/auth');

router.post('/addKriteria',auth, kriteriaController.createKriteria);
router.get('/getKriteria', auth, kriteriaController.getKriteria);
router.get('/getKriteriaId/:id',auth, kriteriaController.getKriteriaById);
router.put('/editKriteria/:id',auth, kriteriaController.updateKriteria);
router.delete('/deleteKriteria/:id',auth, kriteriaController.deleteKriteria);

module.exports = router;