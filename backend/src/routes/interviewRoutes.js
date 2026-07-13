const express = require('express');
const authmiddleware = require('../middlewares/auth.middleware');
const interviewControler = require("../controller/interviewcontroler")
const upload = require("../middlewares/filemiddleware")


const interviewRouter = express.Router();

interviewRouter.post('/',authmiddleware.authUser,upload.single('resume'),interviewControler.generateinterviewcontroler)
interviewRouter.get('/report/:interviewId', authmiddleware.authUser, interviewControler.getInterviewReport)
interviewRouter.get('/getall', authmiddleware.authUser, interviewControler.getAllInterviews)
interviewRouter.post("/resume/pdf/:interviewReportId", authmiddleware.authUser, interviewControler.generateResumePdfController)
    

module.exports = interviewRouter;