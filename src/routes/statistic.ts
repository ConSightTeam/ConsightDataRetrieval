import { Router, Request, Response, NextFunction } from "express";
import { StatisticRepository } from "../repositories/StatisticRepository";
var router = Router();

const display_properties = {
  pm2_5: 'PM 2.5',
  pm10: 'PM 10',
  pm1: 'PM 1',
  temperature: "Temperature",
  humidity: "Humidity",
  co_density: "Co Density"
}

router.get('/:property/:unit/:mode', async function(req: Request, res: Response, next: NextFunction) {
  let date_str: string = req.query['date'];
  let property: string = req.params['property'];
  let unit: string = req.params['unit'];
  let mode: string = req.params['mode'];

  let statistics: Array<Statistic>;
  let dao = new StatisticRepository();

  try {
    if (date_str) {
      let date: Date = new Date(date_str);
      switch (mode) {
        case 'hour': statistics = await dao.getStatisticsPerHourOnCertainDay(property, unit, date); break;
        case 'day': statistics = await dao.getStatisticsPerDayOnCertainMonth(property, unit, date); break;
        case 'month': statistics = await dao.getStatisticsPerMonthOnCertainYear(property, unit, date); break;
        default: throw new Error('Invalid Mode');
      }
    } else {
      switch (mode) {
        case 'hour': statistics = await dao.getStatisticsPerHour(property, unit); break;
        case 'day': statistics = await dao.getStatisticsPerDay(property, unit); break;
        case 'month': statistics = await dao.getStatisticsPerMonth(property, unit); break;
        default: throw new Error('Invalid Mode');
      }
    }
  } catch (e) {
    console.error(e.stack);
    return next(e);
  }

  res.render('statistic', { statistics: statistics, display_property: display_properties[property] || property });
});



module.exports = router;