import { Router } from "express";
import { DataPointRepository } from "../repositories/DataPointRepository";
var router = Router();

router.get('/', async function(req, res, next) {
  let dao = new DataPointRepository(); 
  if (req.query['date']) {
    let to = new Date(req.query['date']);
    let from = new Date();
    from.setDate(to.getDate() - 1);
    res.render('heatmap', { data_points: JSON.stringify(await dao.getFromSpecificTime(from, to))});
  } else {
    res.render('heatmap', { data_points: JSON.stringify(await dao.getLatest()) });
  }
});

module.exports = router;