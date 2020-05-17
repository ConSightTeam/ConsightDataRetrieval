import { Router, Request, Response, NextFunction } from "express";
import { StatisticRepository } from "../repositories/StatisticRepository";
import { ExportToCsv } from 'export-to-csv';
var router = Router();

const display_properties = {
  pm2_5: 'PM 2.5',
  pm10: 'PM 10',
  pm1: 'PM 1',
  temperature: "Temperature",
  humidity: "Humidity",
  co_density: "Co Density"
};

/**
 * Certain reverse proxy escape slash in URL before sending it to us, which cause 404
 * As a workaround we replace slash with '!' in URL
 */
function unescape_slash(original_unit: string) {
  return original_unit.replace('!', '/');
}

function getStatistics(date_str: string, property: string, unit: string, mode: string): Promise<Array<Statistic>> {
  let dao = new StatisticRepository();

  if (date_str) {
    let date: Date = new Date(date_str);
    switch (mode) {
      case 'hour': return dao.getStatisticsPerHourOnCertainDay(property, unit, date);
      case 'day': return dao.getStatisticsPerDayOnCertainMonth(property, unit, date);
      case 'month': return dao.getStatisticsPerMonthOnCertainYear(property, unit, date);
      default: throw new Error('Invalid Mode');
    }
  } else {
    switch (mode) {
      case 'hour': return dao.getStatisticsPerHour(property, unit);
      case 'day': return dao.getStatisticsPerDay(property, unit);
      case 'month': return dao.getStatisticsPerMonth(property, unit);
      default: throw new Error('Invalid Mode');
    }
  }
}

router.get('/:property/:unit/:mode', async function (req: Request, res: Response, next: NextFunction) {
  let date_str: string = req.query['date'];
  let property: string = req.params['property'];
  let unit: string = unescape_slash(req.params['unit']);
  let mode: string = req.params['mode'];

  try {
    res.render('statistic', { statistics: await getStatistics(date_str, property, unit, mode), display_property: display_properties[property] || property, mode: mode });
  } catch (e) {
    console.error(e.stack);
    return next(e);
  }
});

router.get('/:property/:unit/:mode/export', async function (req: Request, res: Response, next: NextFunction) {
  let exporter = new ExportToCsv({ useKeysAsHeaders: true });

  let date_str: string = req.query['date'];
  let property: string = req.params['property'];
  let unit: string = unescape_slash(req.params['unit']);
  let mode: string = req.params['mode'];

  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader("content-disposition", "attachment; filename=\"export.csv\"");

  try {
    let statistics = await getStatistics(date_str, property, unit, mode);
    res.send(exporter.generateCsv(statistics, true));
    res.end();
  } catch (e) {
    console.error(e.stack);
    return next(e);
  }
});

module.exports = router;