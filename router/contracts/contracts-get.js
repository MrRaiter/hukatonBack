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

module.exports = router;
