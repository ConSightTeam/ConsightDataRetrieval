import { Router } from "express";
import { StatisticRepository } from "../repositories/StatisticRepository";
var router = Router();

async function queryLatestBasedOnCertainTime(mode: string, property: string, unit: string, date_str?: string): Promise<Statistic[]> {
  let dao = new StatisticRepository();
  if (date_str) {
    let date: Date = new Date(date_str);
    switch (mode) {
      case 'hour': return await dao.getStatisticsPerHourOnCertainDay(property, unit, date);
      case 'day': return await dao.getStatisticsPerDayOnCertainMonth(property, unit, date);
      case 'month': return await dao.getStatisticsPerMonthOnCertainYear(property, unit, date);
      default: return null;;
    }
  } else {
    switch (mode) {
      case 'hour': return await dao.getStatisticsPerHour(property, unit);
      case 'day': return await dao.getStatisticsPerDay(property, unit);
      case 'month': return await dao.getStatisticsPerMonth(property, unit);
      default: return null;;
    }
  }
}

router.get('/pm2_5/:mode', async function (req, res, next) {
  try {
    res.render('statistic', { display_property: "PM2.5", statistics: await queryLatestBasedOnCertainTime(req.params['mode'], 'pm2_5', 'μg/m^3', req.query['date']) });
  } catch (e) {
    next(e);
  }
});

router.get('/pm10/:mode', async function (req, res, next) {
  try {
    res.render('statistic', { display_property: "PM10", statistics: await queryLatestBasedOnCertainTime(req.params['mode'], 'pm10', 'μg/m^3', req.query['date']) });
  } catch (e) {
    next(e);
  }
});

router.get('/pm1/:mode', async function (req, res, next) {
  try {
    res.render('statistic', { display_property: "PM1", statistics: await queryLatestBasedOnCertainTime(req.params['mode'], 'pm1', 'μg/m^3', req.query['date']) });
  } catch (e) {
    next(e);
  }
});

router.get('/temperature/:mode', async function (req, res, next) {
  try {
    res.render('statistic', { display_property: "Temperature", statistics: await queryLatestBasedOnCertainTime(req.params['mode'], 'temperature', 'c', req.query['date']) });
  } catch (e) {
    next(e);
  }
});

router.get('/humidity/:mode', async function (req, res, next) {
  try {
    res.render('statistic', { display_property: "Humidity", statistics: await queryLatestBasedOnCertainTime(req.params['mode'], 'humidity', '%', req.query['date']) });
  } catch (e) {
    next(e);
  }
});

module.exports = router;