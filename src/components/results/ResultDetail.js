// src/components/admin/result/ResultDetail.js
import React from "react";

const ResultDetail = ({ result, onClose }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Result Details</h3>
      <p><strong>Student Name:</strong> {result.studentName}</p>
      <p><strong>Score:</strong> {result.score}</p>
      <p><strong>Test Date:</strong> {result.testDate}</p>
      <p><strong>Mock Test ID:</strong> {result.mockTestId}</p>
      <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded mt-4">
        Close
      </button>
    </div>
  );
};

export default ResultDetail;
