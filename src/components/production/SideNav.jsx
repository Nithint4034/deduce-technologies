import React, { useRef, useState } from 'react';
import logo from '../../assets/images/DT_Logo.png';
import './SideNav.css';

function SideNav() {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleUploadClick = () => {
    if (!isUploading) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const jpgFiles = files.filter(file => 
      file.type === 'image/jpeg' || file.name.toLowerCase().endsWith('.jpg')
    );
    
    if (jpgFiles.length > 0) {
      setSelectedFiles(jpgFiles);
      startUpload(jpgFiles);
    } else {
      alert('Please select a folder containing JPG images only.');
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
          alert(`Successfully uploaded ${files.length} JPG files!`);
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
        <h3>Production Tools</h3>
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
            {isUploading ? `Uploading... ${uploadProgress}%` : 'Upload JPG Folder'}
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
            <p>{selectedFiles.length} JPG files selected</p>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          multiple
          accept=".jpg,image/jpeg"
          webkitdirectory=""
          directory=""
        />
      </div>
    </div>
  );
}

export default SideNav;