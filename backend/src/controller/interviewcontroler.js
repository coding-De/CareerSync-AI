const pdfParse = require("pdf-parse")
const generateinterviewreport = require("../services/ai.services");
const interviewReportModel = require("../Models/interViewReportsModel")

async function generateinterviewcontroler(req, res) {
    const resumecontent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body;

    if (!resumecontent || !selfDescription || !jobDescription) {
        return res.status(400).json({
            message: "Resume, selfDescription and jobDescription are required"
        })
    }

    const interviewReportAi = await generateinterviewreport.generateInterviewReport({
        resume: resumecontent.text,
        selfDescription,
        jobDescription
    })
    console.log("interviewReportAi", interviewReportAi)
    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumecontent.text,
        selfDescription,
        jobDescription,
        ...interviewReportAi
    });

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    });
}

async function getInterviewReport(req, res) {
    const { interviewId } = req.params;
console.log("interviewId", interviewId)
    const interviewReport = await interviewReportModel.findById(interviewId);

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found"
        });
    }

    res.status(200).json({
        interviewReport
    });
}

async function getAllInterviews(req, res) {
    const interviews = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select('-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -preparationPlan -skillGaps');
    res.status(200).json({
        interviews
    });
}

module.exports = {generateinterviewcontroler, getInterviewReport, getAllInterviews}