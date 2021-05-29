const router = require('express').Router();
const { promises: fs } = require('fs');
const { Contracts, Company, Orders } = require('../../models');
const aunteficate = require('../../middlewares/aunteficate');

router.get('/orders', async (req, res, next) => {
  try {
    const orders = await Orders.findAll({
      include: [{
        model: Company,
      },
      {
        model: Contracts,
      }],
    });

    res.json(orders);
  } catch (err) {
    return res.status(403).json({ message: err });
  }
});

router.get('/order/:orderId', async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Orders.findByPk(orderId, {
      include: [{
        model: Company,
      },
      {
        model: Contracts,
      }],
    });
    res.json(order);
  } catch (err) {
    return res.status(403).json({ message: err });
  }
});

module.exports = router;
