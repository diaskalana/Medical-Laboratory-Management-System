import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AddBlog2() {
    const [formData, setFormData] = useState({
        title: '',
        blogcontent: '',
        id:'',
        resources: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8082/blogg/add', formData);
            navigate('/feedback/blogs');
        } catch (error) {
            console.error('Error adding blog: ', error);
        }
    };

    return (
        <div className="container">
            <h2 className="text-start mt-3">Add Blog</h2>
            <div className="row d-flex justify-content-center align-middle h-100 mt-5">
                <div className="col-6 shadow-lg p-3 text-start mb-5 bg-white rounded" style={{ minWidth: '1000px' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 col-12">
                            <label className="control-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3 col-12">
                            <label className="control-label">Blog Content</label>
                            <textarea
                                className="form-control"
                                name="blogContent"
                                onChange={handleInputChange}

                                rows={10}
                                required
                            />
                        </div>
                        <div className="mb-3 col-12">
                            <label className="control-label"> id </label>
                            <input
                                type="text"
                                className="form-control"
                                name="id"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3 col-12">
                            <label className="control-label">Resources</label>
                            <input
                                type="text"
                                className="form-control"
                                name="resources"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary">
                                Add Blog
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
