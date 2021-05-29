const router = require('express').Router();
const pdf = require('html-pdf');
const ejs = require('ejs');
const path = require('path');
const { promises: fs } = require('fs');
const aunteficate = require('../../middlewares/aunteficate');

const {
  Reports, Orders, Company, Contracts,
} = require('../../models');

router.get('/fetch-pdf', async (req, res) => {
  res.sendFile(`${__dirname}/report.pdf`);
});

router.get('/generateReport/:reportId', async (req, res) => {
  try {
    fs.access(`${__dirname}/report.pdf`, fs.F_OK, async (err) => {
      if (err) {
        console.error(err);
      }
      await fs.unlink(`${__dirname}/report.pdf`);
    });
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
    const newReport = report.dataValues;
    console.log('newReport', newReport);
    ejs.renderFile(path.join(__dirname, './views/template.ejs'), { newReport }, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        const options = {
          height: '8.25in',
          width: '8.5in',
          header: {
            height: '20mm',
          },
          footer: {
            height: '20mm',
          },
        };
        pdf.create(data, options).toFile(`${__dirname}/report.pdf`, (err, data) => {
          if (err) {
            res.send(err);
          } else {
            res.send('File created successfully');
          }
        });
      }
    });
  } catch (err) {
    return res.status(403).json({ message: err });
  }
});

module.exports = router;
