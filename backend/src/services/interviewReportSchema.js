const interviewReportSchema = {
    type: "object",
    description: "Interview preparation report generated for a candidate against a specific job description.",
    properties: {
        jobTitle: {
            type: "string",
            description: "The title of the job for which the interview report is generated."
        },
        matchScore: {
            type: "number",
            description: "A score between 0 and 100 indicating how well the candidate's profile matches the job description."
        },
        technicalQuestions: {
            type: "array",
            description: "Technical questions that can be asked in the interview along with their intention and how to answer them.",
            items: {
                type: "object",
                properties: {
                    question: { type: "string", description: "The technical question that can be asked in the interview." },
                    intention: { type: "string", description: "The intention of the interviewer behind asking this question." },
                    answer: { type: "string", description: "How to answer this question, what points to cover, what approach to take etc." }
                },
                required: [ "question", "intention", "answer" ],
                propertyOrdering: [ "question", "intention", "answer" ]
            }
        },
        behavioralQuestions: {
            type: "array",
            description: "Behavioral questions that can be asked in the interview along with their intention and how to answer them.",
            items: {
                type: "object",
                properties: {
                    question: { type: "string", description: "The behavioral question that can be asked in the interview." },
                    intention: { type: "string", description: "The intention of the interviewer behind asking this question." },
                    answer: { type: "string", description: "How to answer this question, what points to cover, what approach to take etc." }
                },
                required: [ "question", "intention", "answer" ],
                propertyOrdering: [ "question", "intention", "answer" ]
            }
        },
        skillGaps: {
            type: "array",
            description: "List of skill gaps in the candidate's profile along with their severity.",
            items: {
                type: "object",
                properties: {
                    skill: { type: "string", description: "The skill which the candidate is lacking." },
                    severity: {
                        type: "string",
                        enum: [ "low", "medium", "high" ],
                        description: "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances."
                    }
                },
                required: [ "skill", "severity" ],
                propertyOrdering: [ "skill", "severity" ]
            }
        },
        preparationPlan: {
            type: "array",
            description: "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively.",
            items: {
                type: "object",
                properties: {
                    day: { type: "number", description: "The day number in the preparation plan, starting from 1." },
                    focus: { type: "string", description: "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc." },
                    tasks: {
                        type: "array",
                        description: "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
                        items: { type: "string" }
                    }
                },
                required: [ "day", "focus", "tasks" ],
                propertyOrdering: [ "day", "focus", "tasks" ]
            }
        }
    },
    required: [
        "jobTitle",
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan"
    ],
    propertyOrdering: [
        "jobTitle",
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan"
    ]
}

module.exports = interviewReportSchema 