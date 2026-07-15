import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

function InterviewPlans() {
    const [reports, setReports] = useState([])
    const navigate = useNavigate()
    const api = axios.create({
        baseURL: "http://localhost:3000",
        withCredentials: true,
    })


    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await api.get("/interview/getall")
                setReports(response.data.interviews)
            } catch (error) {
                console.error("Error fetching reports:", error)
            }
        }

        fetchReports()
    }, [])

    return (
        <div>
            {/* Recent Reports List */}
            {reports.length > 0 && (
                <section className='recent-reports'>
                    <h2>My Recent Interview Plans</h2>
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3>{report.title || 'Untitled Position'}</h3>
                                <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    )
}

export default InterviewPlans
