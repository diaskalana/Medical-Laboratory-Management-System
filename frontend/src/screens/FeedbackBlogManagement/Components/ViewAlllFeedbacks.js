import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSearch, faEye, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { PDFDocument, rgb } from 'pdf-lib';

export default function ViewAllFeedbacks() {
    const [feedbackData, setFeedbackData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteFeedbackId, setDeleteFeedbackId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch feedback data from the server
        fetch('http://localhost:8082/feedback/')
            .then((response) => response.json())
            .then((data) => setFeedbackData(data))
            .catch((error) => console.error('Error fetching feedback data:', error));
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredFeedbackData = feedbackData.filter((item) =>
        item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDeleteFeedback = (feedbackId) => {
        fetch(`http://localhost:8082/feedback/delete/${feedbackId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                setFeedbackData((prevData) =>
                    prevData.filter((item) => item._id !== feedbackId)
                );
                setShowDeleteModal(false);
            })
            .catch((error) => console.error('Error deleting feedback:', error));
    };

    const generatePDFReport = async () => {
        try {
            const pdfDoc = await PDFDocument.create();

            const page = pdfDoc.addPage([1000, 400]);
            const { width, height } = page.getSize();
            const fontSize = 30;
            const padding = 30;

            page.drawText('Feedback Report', {
                x: padding,
                y: height - padding - fontSize,
                size: fontSize,
                color: rgb(0, 0, 0),
            });

            let yOffset = height - padding - fontSize * 2 - 20;

            filteredFeedbackData.forEach((feedback, index) => {
                const feedbackText = `${index + 1}. Email: ${feedback.email}, User Name: ${feedback.userName}, Date: ${feedback.date}, Message: ${feedback.message}, Rate: ${feedback.rate}`;
                page.drawText(feedbackText, {
                    x: padding,
                    y: yOffset,
                    size: 12,
                    color: rgb(0, 0, 0),
                });
                yOffset -= 20;
            });

            const pdfBytes = await pdfDoc.save();

            // Create a Blob object representing the PDF data
            const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

            // Create a download link and trigger a click event to download the PDF
            const a = document.createElement('a');
            a.href = URL.createObjectURL(pdfBlob);
            a.download = 'feedback_report.pdf';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error generating PDF report:', error);
        }
    };

    return (
        <div className='container'>
            <h1>View All Feedbacks</h1>
            <div className="col-12" >
                <div className='d-flex justify-content-end'>
                    <button className="btn btn-success my-5" onClick={generatePDFReport}>
                        Generate PDF Report
                    </button>
                </div>
                <form>
                    <div className="p-1 col-4 bg-light d-flex rounded rounded-pill shadow-sm mb-4">
                       
                        <div className="input-group">
                            <input
                                type="search"
                                placeholder="Search Feedback by Email"
                                aria-describedby="button-addon1"
                                className="form-control border-0 bg-light"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <div className="input-group-append m-2">
                                <button
                                    id="button-addon1"
                                    type="submit"
                                    className="btn btn-link text-primary"
                                >
                                    <FontAwesomeIcon className='text-success' icon={faSearch} />
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </form>
            </div>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Message</th>
                        <th scope="col">Rate</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFeedbackData.map((feedbackItem, index) => (
                        <tr key={feedbackItem._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{feedbackItem.email}</td>
                            <td>{feedbackItem.userName}</td>
                            <td>{feedbackItem.date}</td>
                            <td>{feedbackItem.message}</td>
                            <td>{feedbackItem.rate}</td>
                            <td>
                                <Link to={`/feedback/editfeedback/${feedbackItem._id}`}>
                                    <button className='btn btn-success'>Edit</button>
                                </Link>
                            </td>
                            <td >
                                <button
                                    className='btn btn-danger'
                                    onClick={() => {
                                        setDeleteFeedbackId(feedbackItem._id);
                                        setShowDeleteModal(true);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Delete Feedback Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this feedback?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteFeedback(deleteFeedbackId)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
