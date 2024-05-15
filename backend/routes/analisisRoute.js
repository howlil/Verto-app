const express = require('express');
const router = express.Router();
const analisisController = require('../controllers/analisisController');
// const auth = require('../middlewares/auth');

// router.post('/addDetailKriteria',auth, detailKriteriaController.createDetailKriteria);
// router.get('/getDetailKriteria',auth, detailKriteriaController.getAllDetailKriteria);
// router.get('/getDetailKriteria/:id',auth, detailKriteriaController.getDetailKriteriaById);
// router.put('/editDetailKriteria/:id',auth, detailKriteriaController.updateDetailKriteria);
// router.delete('deleteDetailKriteria/:id',auth, detailKriteriaController.deleteDetailKriteria);

router.post('/addAnalisis', analisisController.analisisTopsis);
router.get('/getAnalisis', analisisController.showTopsisData);

module.exports = router;
