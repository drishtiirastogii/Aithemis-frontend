import React, { useEffect, useState } from "react";

const Result = () => {
  const [fileId, setFileId] = useState(null);
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFileId = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-file-id");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Received fileId:", data.fileId);
        setFileId(data.fileId);
      } catch (err) {
        console.error("Error fetching fileId:", err);
        setError("Failed to retrieve file information.");
        setIsLoading(false);
      }
    };

    fetchFileId();
  }, []);

  useEffect(() => {
    const generateAnswer = async () => {
      if (!fileId) return;

      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("http://localhost:5000/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileId })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to generate answer");
        }
        const data = await response.json();
        setAnswer(data.answer || "No answer generated.");
        setIsLoading(false);
      } catch (err) {
        console.error("Error generating answer:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    generateAnswer();
  }, [fileId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center">
        <div className="h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Generating answer...</p>
        </div>
    );
  }

  if (error) {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Generated Answer</h1>
    </div>
  );
};

export default Result;