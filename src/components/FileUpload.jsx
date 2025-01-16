import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FileUpload = ({ onUploadComplete }) => {
  const [state, setState] = useState([]);  
  const [isUploaded, setIsUploaded] = useState(false);
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    setState(acceptedFiles);
  };

  const removeFile = (index) => {
    const newState = [...state];
    newState.splice(index, 1);
    setState(newState);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop,
    accept : '.pdf,.doc,.docx,.txt'
   });

   const handleUpload = async (file) => {
    if (state.length === 0) {
      alert('Please select a file to upload');
      return;
    }
  
    const formData = new FormData();
    state.forEach((file) => {
      console.log('Adding file to FormData:', file);
      formData.append('file', file); 
    });
  
    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
  
      if (response.status === 200) {
        const fileId = response.data.fileId;
        alert('File(s) uploaded successfully!');
        setIsUploaded(true); 
        setState([]); 
        navigate('/questions', { state: { fileId: String(response.data.fileId) } });
      }
    } catch (error) {
      console.error('Error uploading file(s):', error.response?.data || error);
      alert('Error uploading file(s)');
    }
  };  

  return (
    <>
      <h1>UPLOAD YOUR DOCUMENT HERE.</h1>
      <div className="root-file" {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
      <div>
        {state && state.length > 0 && state.map((file, i) => (
          <div key={i} className="file-item">
            <p>{file.name}</p>
            <button onClick={() => removeFile(i)}>Remove document</button>
          </div>
        ))}
      </div>
      <button className='file-button' onClick={handleUpload}>Upload document</button>
    </>
  );
};

export default FileUpload;
