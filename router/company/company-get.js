const router = require('express').Router();
const { promises: fs } = require('fs');
const { Company } = require('../../models');
const aunteficate = require('../../middlewares/aunteficate');

router.get('/company', async (req, res, next) => {
  try {
    const companies = await Company.findAll();

    res.json(companies);
  } catch (err) {
    return res.status(403).json({ message: err });
  }
});

module.exports = router;
