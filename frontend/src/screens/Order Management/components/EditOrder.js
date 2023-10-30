import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    date: '',
    company: '',
    destination: '',
    items: 0,
    status: '',
  });

  useEffect(() => {
    async function fetchOrderData() {
      try {
        const response = await fetch(`http://localhost:8082/order/get/${id}`);

        if (response.ok) {
          const data = await response.json();
          setOrder(data);
        } else {
          console.error('Failed to fetch order data');
        }
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    }

    fetchOrderData();
  }, [id]);

  const handleUpdateOrder = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8082/order/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        navigate('/vieworders');
      } else {
        console.error('Failed to update order');
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div className='col-12'>
      <div className="container-fluid pt-5">
        <div className="container p-5 mt-5 bg-secondary" style={{ borderRadius: 20 ,backgroundColor:'white'}}>
          <h1 className="mt-3 text-center">Edit Order</h1>
          <div className="container">
            <form onSubmit={handleUpdateOrder}>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="orderId">Order ID</label>
                    <input
                      type="text"
                      className="form-control"
                      id="orderId"
                      value={id}
                      placeholder="Order ID"
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="orderDate">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="orderDate"
                      value={order.date}
                      onChange={(e) => setOrder({ ...order, date: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="orderCompany">Company</label>
                    <input
                      type="text"
                      className="form-control"
                      id="orderCompany"
                      value={order.company}
                      onChange={(e) => setOrder({ ...order, company: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="orderDestination">Destination</label>
                    <input
                      type="text"
                      className="form-control"
                      id="orderDestination"
                      value={order.destination}
                      onChange={(e) => setOrder({ ...order, destination: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="orderItems">Items</label>
                    <input
                      type="number"
                      className="form-control"
                      id="orderItems"
                      value={order.items}
                      onChange={(e) => setOrder({ ...order, items: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="orderStatus">Status</label>
                    <input
                      type="text"
                      className="form-control"
                      id="orderStatus"
                      value={order.status}
                      onChange={(e) => setOrder({ ...order, status: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn col-3 mt-3 mb-5 btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
