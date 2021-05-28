const router = require('express').Router();
const { promises: fs } = require('fs');
const { Contracts, Company } = require('../../models');
const aunteficate = require('../../middlewares/aunteficate');

router.get('/contracts', async (req, res, next) => {
  try {
    // const userId = res.locals.user.id;  aunteficate(),

    const contracts = await Contracts.findAll({
      include: [{
        model: Company,
      }],
    });
    res.json(contracts);
  } catch (err) {
    console.log('err', err);
    return res.status(403).json({ message: err });
  }
});

module.exports = router;
