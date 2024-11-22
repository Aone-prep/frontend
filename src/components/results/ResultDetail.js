import React from "react";

const ResultDetail = ({ result, onClose }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Result Details</h3>
      <p><strong>Student Name:</strong> {result.studentName}</p>
      <p><strong>Description:</strong> {result.description}</p>
      <p><strong>Obtained Marks:</strong> {result.obtainedMarks}</p>
      <p><strong>Pass Mark:</strong> {result.passMark}</p>
      <p><strong>Full Mark:</strong> {result.fullMark}</p>
      <p><strong>Mock Test Name:</strong> {result.mockTestName}</p>
      <p><strong>Created At:</strong> {new Date(result.createdAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(result.updatedAt).toLocaleString()}</p>
      
      <button
        onClick={onClose}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded mt-4"
      >
        Close
      </button>
    </div>
  );
};

export default ResultDetail;
