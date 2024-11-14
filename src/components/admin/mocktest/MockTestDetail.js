// src/components/admin/mocktest/MockTestDetail.js
import React from "react";

const MockTestDetail = ({ mockTest, onClose }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Mock Test Details</h3>
      <p><strong>Name:</strong> {mockTest.name}</p>
      <p><strong>Description:</strong> {mockTest.description}</p>
      <p><strong>Duration:</strong> {mockTest.duration} mins</p>
      <p><strong>Max Score:</strong> {mockTest.maxScore}</p>
      <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded mt-4">
        Close
      </button>
    </div>
  );
};

export default MockTestDetail;
