const express = require('express');
const router = express.Router();
const detailKriteriaController = require('../controllers/detailKriteriaController');
const auth = require('../middlewares/auth');

router.post('/addDetailKriteria',auth, detailKriteriaController.createDetailKriteria);
router.get('/getDetailKriteria',auth, detailKriteriaController.getAllDetailKriteria);
router.get('/getDetailKriteria/:id',auth, detailKriteriaController.getDetailKriteriaById);
router.put('/editDetailKriteria/:id',auth, detailKriteriaController.updateDetailKriteria);
router.delete('deleteDetailKriteria/:id',auth, detailKriteriaController.deleteDetailKriteria);

module.exports = router;
