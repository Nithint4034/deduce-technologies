import React, { useRef, useState } from 'react';
import logo from '../../assets/images/DT_Logo.png';
import './SideNav.css';

function SideNav({ onOpenCountTable, onOpenUserSearch }) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleOpenCountTable = () => {
    if (typeof onOpenCountTable === 'function') {
      onOpenCountTable();
    }
  };

  const handleOpenUserSearch = () => {
    if (typeof onOpenUserSearch === 'function') {
      onOpenUserSearch();
    }
  };

  const handleUploadClick = () => {
    if (!isUploading) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter(file =>
      file.type.startsWith('image/') &&
      (file.type === 'image/jpeg' || file.type === 'image/png' || file.name.toLowerCase().match(/\.(jpg|jpeg|png)$/))
    );

    if (imageFiles.length > 0) {
      setSelectedFiles(imageFiles);
      startUpload(imageFiles);
    } else {
      alert('Please select a folder containing image files (JPG, PNG).');
    }
  };

  const startUpload = (files) => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          alert(`Successfully uploaded ${files.length} image files!`);
          setSelectedFiles([]);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const stopUpload = () => {
    setIsUploading(false);
    setUploadProgress(0);
    setSelectedFiles([]);
  };

  return (
    <div className="sidenav">
      <div className="sidenav-header">
        <img src={logo} alt="DT Logo" className="sidenav-logo" />
        <h3>Travelshoot Tools</h3>
      </div>
      <div className="sidenav-content">
        <div className="upload-section">
          <button
            className={`upload-button ${isUploading ? 'uploading' : ''}`}
            onClick={handleUploadClick}
            disabled={isUploading}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {isUploading ? `Uploading... ${uploadProgress}%` : 'Upload Images'}
          </button>
          {isUploading && (
            <button className="stop-button" onClick={stopUpload}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              </svg>
            </button>
          )}
        </div>
        {selectedFiles.length > 0 && (
          <div className="file-info">
            <p>{selectedFiles.length} image files selected</p>
          </div>
        )}

        <div className="tool-section">
          <button type="button" className="tool-button" onClick={handleOpenCountTable}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 5h18M6 9h12M9 13h6M7 17h10" />
            </svg>
            Total Count Table
          </button>

          <button type="button" className="tool-button" onClick={handleOpenUserSearch}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
              <line x1="18" y1="8" x2="23" y2="13" />
              <line x1="23" y1="8" x2="18" y2="13" />
            </svg>
            User Details Search
          </button>

          <button type="button" className="tool-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Location Planner
          </button>

          <button type="button" className="tool-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Schedule Manager
          </button>

          <button type="button" className="tool-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.828 14.828a4 4 0 0 1-5.656 0M9 10h1.586a1 1 0 0 1 .707.293l.707.707A1 1 0 0 0 13.414 11H15m-3-3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
            Weather Check
          </button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          multiple
          accept="image/*"
          webkitdirectory=""
          directory=""
        />
      </div>
    </div>
  );
}

export default SideNav;