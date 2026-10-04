import React, { useState } from 'react';
import './AdminDashboard.css';

// const API_URL = 'YOUR_RENDER_BACKEND_URL';
// const API_URL = 'http://localhost:5000';
const API_URL = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (selectedFile.type !== 'application/pdf') {
      setMessage('Please select a PDF file only.');
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setMessage('');
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!selectedClass) {
      setMessage('Please select a class.');
      return;
    }

    if (!title.trim()) {
      setMessage('Please enter a material title.');
      return;
    }

    if (!file) {
      setMessage('Please select a PDF file.');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      const formData = new FormData();

      formData.append('title', title);
      formData.append('className', selectedClass);
      formData.append('pdf', file);

      const response = await fetch(
        `${API_URL}/api/materials/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Upload failed.'
        );
      }

      setMessage(
        'PDF uploaded successfully! Students can now see it in Study Material.'
      );

      setSelectedClass('');
      setTitle('');
      setFile(null);

      event.target.reset();

    } catch (error) {
      console.error('Upload error:', error);

      setMessage(
        error.message ||
        'Something went wrong while uploading the PDF.'
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">

      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Upload study materials class-wise</p>
        </div>
      </div>

      <div className="upload-card">

        <h2>Upload Study Material</h2>

        <form onSubmit={handleUpload}>

          {/* Class */}

          <div className="form-group">

            <label htmlFor="class">
              Select Class
            </label>

            <select
              id="class"
              value={selectedClass}
              onChange={(event) =>
                setSelectedClass(event.target.value)
              }
            >

              <option value="">
                Select Class
              </option>

              <option value="6">
                Class 6
              </option>

              <option value="7">
                Class 7
              </option>

              <option value="8">
                Class 8
              </option>

              <option value="9">
                Class 9
              </option>

              <option value="10">
                Class 10
              </option>

              <option value="11">
                Class 11
              </option>

              <option value="12">
                Class 12
              </option>

            </select>

          </div>


          {/* Title */}

          <div className="form-group">

            <label htmlFor="title">
              Material Title
            </label>

            <input
              id="title"
              type="text"
              placeholder="Example: Class 10 History Notes"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
            />

          </div>


          {/* PDF */}

          <div className="form-group">

            <label htmlFor="pdf">
              Select PDF
            </label>

            <input
              id="pdf"
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
            />

          </div>


          {/* File Preview */}

          {file && (

            <div className="file-preview">

              <span>📄</span>

              <div>

                <strong>
                  {file.name}
                </strong>

                <small>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </small>

              </div>

            </div>

          )}


          {/* Upload Button */}

          <button
            type="submit"
            className="upload-button"
            disabled={loading}
          >

            {loading
              ? 'Uploading...'
              : 'Upload PDF'}

          </button>


          {/* Message */}

          {message && (

            <p className="upload-message">
              {message}
            </p>

          )}

        </form>

      </div>

    </div>
  );
};

export default AdminDashboard;