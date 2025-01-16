import React, {useState, useEffect} from 'react';
import SearchBar from '../components/SearchBar';
import { useNavigate, useLocation } from 'react-router-dom';
import FileUpload from '../components/FileUpload'; 
import axios from "axios";
import BaseURL from "../Urls";

const Questions = () => {
  const [question, setQuestion] = useState("");
  const [fileId, setFileId] = useState(null);
  const navigate = useNavigate(); 
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.fileId) {
      setFileId(location.state.fileId);
    }
  }, [location]);

  const handleSubmit = async () => {
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    if (!fileId) {
      alert("No file uploaded or file details not found.");
      return;
    }

    try {
        const response = await axios.post( `${BaseURL}`, {
        question,
        fileId,
      });

      const answer = response.data.answer; // Get the answer from the response
      navigate('/result', { state: { answer } });

    } catch (error) {
      alert("There was an error processing your question. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <SearchBar value={question} onChange={(e) => setQuestion(e.target.value)}/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Questions;
