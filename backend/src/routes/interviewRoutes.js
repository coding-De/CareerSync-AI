const express = require('express');
const authmiddleware = require('../middlewares/auth.middleware');
const interviewControler = require("../controller/interviewcontroler")
const upload = require("../middlewares/filemiddleware")


const interviewRouter = express.Router();

interviewRouter.post('/',authmiddleware.authUser,upload.single('resume'),interviewControler.generateinterviewcontroler)
interviewRouter.get('/report/:interviewId', authmiddleware.authUser, interviewControler.getInterviewReport)

module.exports = interviewRouter;