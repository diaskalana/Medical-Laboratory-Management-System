import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteBlogId, setDeleteBlogId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // Fetch blogs data from the server
    axios.get('http://localhost:8082/blogg/')
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching blogs data:', error);
      });
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.blog.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.resources.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteBlog = (blogId) => {
    axios.delete(`http://localhost:8082/blogg/delete/${blogId}`)
      .then(() => {
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
        setShowDeleteModal(false);
      })
      .catch(error => {
        console.error('Error deleting blog:', error);
      });
  };

  return (
    <div className='container-fluid'>
      <h1>View All Blogs</h1>
     <Link to="/feedback/addblog"><button className="btn btn-primary mx-2 my-4">Add a Blog + </button></Link> 
      <div className='col-8' style={{ minWidth: '1000px' }}>
        <form>
          <div className="p-1 col-4 bg-light d-flex rounded rounded-pill shadow-sm mb-4">
            <div className="input-group">
              <input
                type="search"
                placeholder="Search Blogs"
                aria-describedby="button-addon1"
                className="form-control border-0 bg-light"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Blog</th>
            <th scope="col">Resources</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredBlogs.map((blog, index) => (
            <tr key={blog._id}>
              <th scope="row">{index + 1}</th>
              <td className='text-truncate'>{blog.title}</td>
              <td className='text-truncate'>{blog.blog}</td>
              <td className='text-truncate'>{blog.resources}</td>
              <td>
                <Link to={`/editblog/${blog._id}`}>
                  <button className='btn btn-success'><FontAwesomeIcon icon={faEdit} /> Edit</button>
                </Link>
              </td>
              <td>
                <button className='btn btn-danger'
                  onClick={() => {
                    setDeleteBlogId(blog._id);
                    setShowDeleteModal(true);
                  }}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this blog?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDeleteBlog(deleteBlogId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
