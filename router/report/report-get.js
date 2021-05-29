const router = require('express').Router();
const { promises: fs } = require('fs');
const {
  Reports, Orders, Company, Contracts,
} = require('../../models');
const aunteficate = require('../../middlewares/aunteficate');

router.get('/reports', async (req, res, next) => {
  try {
    const reports = await Reports.findAll({
      include: [{
        model: Orders,
        include: [{
          model: Company,
        },
        {
          model: Contracts,
        }],
      }],
    });

    res.json(reports);
  } catch (err) {
    return res.status(403).json({ message: err });
  }
});

router.get('/report/:reportId', async (req, res, next) => {
  try {
    const { reportId } = req.params;
    const report = await Reports.findByPk(reportId, {
      include: [{
        model: Orders,
        include: [{
          model: Company,
        },
        {
          model: Contracts,
        }],
      }],
    });
    res.json(report);
  } catch (err) {
    return res.status(403).json({ message: err });
  }
});

module.exports = router;
