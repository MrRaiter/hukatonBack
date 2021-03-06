const router = require('express').Router();
const { promises: fs } = require('fs');
const { Contracts, Company } = require('../../models');
const aunteficate = require('../../middlewares/aunteficate');

router.get('/contracts', async (req, res, next) => {
  try {
    const contracts = await Contracts.findAll({
      include: [{
        model: Company,
      }],
    });
    res.json(contracts);
  } catch (err) {
    return res.status(403).json({ message: err });
  }
});
router.get('/contract/:contractId', async (req, res, next) => {
  try {
    const { contractId } = req.params;
    const contracts = await Contracts.findByPk(contractId, {
      include: [{
        model: Company,
      }],
    });
    res.json(contracts);
  } catch (err) {
    return res.status(403).json({ message: err });
  }
});

module.exports = router;
