const router = require('express').Router();
const aunteficate = require('../../middlewares/aunteficate');
const { Company } = require('../../models');

router.post('/company', async (req, res, next) => {
  try {
    // aunteficate(),
    const {
      title, inn, phone, email,
    } = req.body;
    // const userId = res.locals.user.id;
    const newCompany = {
      title,
      inn,
      phone,
      email,
    };
    const category = await Company.create(newCompany);
    res.json(category);
  } catch (err) {
    return res.status(403).json({ message: 'something went wrong' });
  }
});

module.exports = router;
