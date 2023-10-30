import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditBlog() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        id:'',
        title: '',
        blog: '', // Corrected typo in the state property name
        id: '',
        resources: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/blogg/get/${id}`);
                const blogData = response.data; // Assuming the API response contains blog data
                setFormData({
                    title: blogData.title,
                    blog: blogData.blog, // Corrected typo in the property name
                    id: blogData._id,
                    resources: blogData.resources
                });
            } catch (error) {
                console.error('Error fetching blog data: ', error);
            }
        };

        fetchBlogData(); // Fetch blog data when the component mounts
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8082/blogg/update/${id}`, formData); // Assuming the API endpoint for updating a blog post
            navigate('/feedback/blogs');
        } catch (error) {
            console.error('Error updating blog: ', error);
        }
    };

    return (
        <div className="container">
            <h2 className="text-start mt-3">Edit Blog</h2>
            <div className="row d-flex justify-content-center align-middle h-100 mt-5">
                <div className="col-6 shadow-lg p-3 text-start mb-5 bg-white rounded" style={{ minWidth: '1000px' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 col-12">
                            <label className="control-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3 col-12">
                            <label className="control-label">Blog Content</label>
                            <input
                                className="form-control"
                                name="blogContent"
                                value={formData.blog}
                                onChange={handleInputChange}
                                rows={10}
                                required
                            />
                        </div>
                        <div className="mb-3 col-12">
                            <label className="control-label">Id</label>
                            <input
                                type="text"
                                className="form-control"
                                name="id"
                                value={formData.id}
                                onChange={handleInputChange}
                                disabled
                            />
                        </div>
                        <div className="mb-3 col-12">
                            <label className="control-label">Resources</label>
                            <input
                                type="text"
                                className="form-control"
                                name="resources"
                                value={formData.resources}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary">
                                Update Blog
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
