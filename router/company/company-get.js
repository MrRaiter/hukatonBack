const router = require('express').Router();
const { promises: fs } = require('fs');
const { Company, User } = require('../../models');
const aunteficate = require('../../middlewares/aunteficate');

router.get('/company', async (req, res, next) => {
  try {
    const companies = await Company.findAll();

    res.json(companies);
  } catch (err) {
    return res.status(403).json({ message: err });
  }
});
router.get('/mycompany', aunteficate(), async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const companies = await Company.findAll({
      include: [{
        model: User,
        where: { id: userId },
      }],
    });

    res.json(...companies);
  } catch (err) {
    return res.status(403).json({ message: err });
  }
});

router.get('/company/:companyId', async (req, res, next) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findByPk(companyId);
    res.json(company);
  } catch (err) {
    return res.status(403).json({ message: err });
  }
});

module.exports = router;
