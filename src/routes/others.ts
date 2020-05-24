import { Router, Request, Response } from "express";
var router = Router();

router.get('/', function(req: Request, res: Response) {
    res.render('others', { active: { Statistic: true, Others: true } });
});

module.exports = router;