const router = require('express').Router();
const aunteficate = require('../../middlewares/aunteficate');
const { Reports } = require('../../models');

router.post('/report', async (req, res, next) => {
  try {
    // aunteficate(),
    const {
      order_id, title, description, start_date, end_date,
    } = req.body;
    // const userId = res.locals.user.id;
    const newReport = {
      order_id, title, description, start_date, end_date,
    };
    const report = await Reports.create(newReport);
    res.json(report);
  } catch (err) {
    return res.status(403).json({ message: 'something went wrong' });
  }
});

module.exports = router;
