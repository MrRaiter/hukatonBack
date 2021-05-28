const router = require('express').Router();
const { promises: fs } = require('fs');
const { Company } = require('../../models');
const aunteficate = require('../../middlewares/aunteficate');

router.get('/company', async (req, res, next) => {
  try {
    // const userId = res.locals.user.id;  aunteficate(),

    const companies = await Company.findAll();
    // {
    //   order: [['id']],
    //   include: [{
    //     model: Note,
    //     as: 'taskIds',
    //     required: false,
    //     attributes: ['id'],
    //   }],
    //   where: { UserId: userId },
    // }
    res.json(companies);
  } catch (err) {
    return res.status(403).json({ message: err });
  }
});

module.exports = router;
