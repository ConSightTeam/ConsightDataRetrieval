import { Router, Request, Response } from "express";
var router = Router();

router.get('/', function(req: Request, res: Response) {
    res.render('doc', { active: { Doc: true } });
});

module.exports = router;