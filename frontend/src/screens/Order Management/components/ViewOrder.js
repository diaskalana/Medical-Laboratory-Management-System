import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'
import {
    faMagnifyingGlass,
    faFilePdf,
    faPenToSquare,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { PDFDocument, rgb } from 'pdf-lib';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function ViewOrder() {
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [orderToRemove, setOrderToRemove] = useState(null);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch('http://localhost:8082/order'); // Adjust the API endpoint
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                    setFilteredOrders(data);
                } else {
                    console.error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }

        fetchOrders();
    }, []);

    const pdfBlobRef = useRef(null);

    useEffect(() => {
        if (pdfBlobRef.current) {
            const pdfUrl = URL.createObjectURL(pdfBlobRef.current);

            window.open(pdfUrl);
        }
    }, [pdfBlobRef]);

    const createPdf = async (orderData) => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([400, 600]);

        const titleSize = 15;
        const textSize = 11;
        const titleColor = rgb(0, 0, 0);
        const textColor = rgb(0, 0, 0);
        const spacing = 10;

        page.drawText('Order List', {
            x: 50,
            y: 550,
            size: titleSize,
            color: titleColor,
        });

        let y = 520;

        orderData.forEach((order) => {
            const { date, company, destination, items, status } = order;

            page.drawText(`Date: ${date}`, {
                x: 50,
                y: y,
                size: textSize,
                color: textColor,
            });
            y -= spacing;

            page.drawText(`Company: ${company}`, {
                x: 50,
                y: y,
                size: textSize,
                color: textColor,
            });
            y -= spacing;

            page.drawText(`Destination: ${destination}`, {
                x: 50,
                y: y,
                size: textSize,
                color: textColor,
            });
            y -= spacing;

            page.drawText(`Items: ${items}`, {
                x: 50,
                y: y,
                size: textSize,
                color: textColor,
            });
            y -= spacing;

            page.drawText(`Status: ${status}`, {
                x: 50,
                y: y,
                size: textSize,
                color: textColor,
            });
            y -= spacing;

            y -= spacing;
        });

        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

        const pdfUrl = URL.createObjectURL(pdfBlob);

        window.open(pdfUrl);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);

        if (e.target.value === '') {
            setFilteredOrders([...orders]);
        } else {
            const filtered = orders.filter((order) =>
                order.company.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setFilteredOrders(filtered);
        }
    };

    const handleOpenModal = (order) => {
        setOrderToRemove(order);
        setShowModal(true);
    };

    const handleRemoveOrder = async () => {
        try {
            const response = await fetch(`http://localhost:8082/order/delete/${orderToRemove._id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                const updatedOrders = orders.filter(
                    (order) => order._id !== orderToRemove._id
                );
                setOrders(updatedOrders);
                setFilteredOrders(updatedOrders);
                handleCloseModal();
            } else {
                console.error("Failed to remove order");
            }
        } catch (error) {
            console.error("Error removing order:", error);
        }
    };

    const handleCloseModal = () => {
        setOrderToRemove(null);
        setShowModal(false);
    };

    return (
        <div className="h-100 col-12">
            <div className="container">
                <div className="row mt-5 py-5">
                    <div className="col-12 mt-3">
                        <div className="row">
                            <div className="col-8">
                                <h3>Order List</h3>
                            </div>
                            <div className="col-3">
                                <Link to="/inventory/addorder">
                                    <button
                                        className="btn btn-primary col-12"
                                    >
                                        Add +
                                    </button>
                                </Link>
                            </div>
                            <div className="col-1">
                                <button
                                    className="btn btn-secondary col-12"
                                    onClick={() => createPdf(filteredOrders)}
                                >
                                    <FontAwesomeIcon icon={faFilePdf} />
                                </button>
                            </div>
                        </div>

                        <div className="col-6">
                            <form action="">
                                <div className="p-1 bg-light d-flex rounded rounded-pill shadow-sm mb-4">
                                    <div className="input-group">
                                        <input
                                            type="search"
                                            placeholder="Search Company Name"
                                            aria-describedby="button-addon1"
                                            className="form-control border-0 bg-light"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                id="button-addon1"
                                                type="submit"
                                                className="btn btn-link text-primary"
                                            >
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Company</th>
                                <th scope="col">Destination</th>
                                <th scope="col">Items</th>
                                <th scope="col">Status</th>
                                <th scope="col">Edit</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order.date}</td>
                                    <td>{order.company}</td>
                                    <td>{order.destination}</td>
                                    <td>{order.items}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <Link to={`/inventory/editorder/${order._id}`}>
                                            <button
                                                className="btn btn-primary"
                                            >
                                                Edit
                                            </button>
                                        </Link>
                                    </td>
                                    <td className="text-danger pt-3">
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            style={{ fontSize: 25, cursor: 'pointer' }}
                                            onClick={() => handleOpenModal(order)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Removal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to remove{' '}
                        {`${orderToRemove?.company}`}?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleRemoveOrder}>
                            Remove
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
