import { Router, Request, Response, NextFunction } from "express";
import { DataPointRepository } from "../repositories/DataPointRepository";
var router = Router();

/* GET home page. */
router.get('/', async function(req: Request, res: Response, next: NextFunction) {
  let dao = new DataPointRepository(); 

  try {
    if (req.query['date']) {
      let to = new Date(req.query['date']);
      let from = new Date();
      from.setDate(to.getDate() - 1);
      res.render('home', { active: { Home: true }, data_points: JSON.stringify(await dao.getFromSpecificTime(from, to))});
    } else {
      res.render('home', { active: { Home: true }, data_points: JSON.stringify(await dao.getLatest()) });
    }
  } catch (e) {
    console.error(e.stack);
    next(e);
  }
});

module.exports = router;