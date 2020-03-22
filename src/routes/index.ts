import { Router } from "express";
import { DataPointRepository } from "../repositories/DataPointRepository";
var router = Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  let dao = new DataPointRepository(); 
  res.render('home', { title: 'Express v0.5', data_points: JSON.stringify(await dao.getLatest()) });
});

module.exports = router;