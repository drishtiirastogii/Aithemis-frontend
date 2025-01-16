import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate(); 
  const [isUploaded, setIsUploaded] = useState(false);

  const handleUploadComplete = () => {
    setIsUploaded(true); 
    navigate('/questions'); 
  };

  return (
    <div>
      <FileUpload onUploadComplete={handleUploadComplete} />
    </div>
  );
};

export default HomePage;
