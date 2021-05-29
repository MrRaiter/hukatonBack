const router = require('express').Router();

router.get('/', (req, res) => res.send('home'));
router.use('/', require('./auth/auth'));
router.use('/', require('./company/company-get'));
router.use('/', require('./company/company-post'));
router.use('/', require('./order/order-get'));
router.use('/', require('./report/report-get'));
router.use('/', require('./contracts/contracts-get'));
router.use('/', require('./export/export'));

module.exports = router;
