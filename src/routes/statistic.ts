import { Router } from "express";
import { StatisticRepository } from "../repositories/StatisticRepository";
var router = Router();

router.get('/pm2_5', async function(req, res, next) {
  let dao = new StatisticRepository(); 
  res.render('statistic', { display_property: "PM2.5", statistic: await dao.getStatisticFromSpecificDate('pm2_5', 'μg/m^3', new Date()) });
});

router.get('/pm10', async function(req, res, next) {
  let dao = new StatisticRepository(); 
  res.render('statistic', { display_property: "PM10", statistic: await dao.getStatisticFromSpecificDate('pm10', 'μg/m^3', new Date()) });
});

router.get('/pm1', async function(req, res, next) {
  let dao = new StatisticRepository(); 
  res.render('statistic', { display_property: "PM1", statistic: await dao.getStatisticFromSpecificDate('pm1', 'μg/m^3', new Date()) });
});

router.get('/temperature', async function(req, res, next) {
  let dao = new StatisticRepository(); 
  res.render('statistic', { display_property: "Temperature", statistic: await dao.getStatisticFromSpecificDate('temperature', 'c', new Date()) });
});

router.get('/humidity', async function(req, res, next) {
  let dao = new StatisticRepository(); 
  res.render('statistic', { display_property: "Humidity", statistic: await dao.getStatisticFromSpecificDate('humidity', '%', new Date()) });
});

module.exports = router;