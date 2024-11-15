// src/components/admin/result/EditResultForm.js
import React, { useState } from "react";

const EditResultForm = ({ result, onSave, onCancel }) => {
  const [studentName, setStudentName] = useState(result.studentName);
  const [score, setScore] = useState(result.score);
  const [testDate, setTestDate] = useState(result.testDate);
  const [mockTestId, setMockTestId] = useState(result.mockTestId);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...result, studentName, score, testDate, mockTestId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold mb-4">Edit Result</h3>
      <div className="mb-4">
        <label className="block text-gray-700">Student Name</label>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Score</label>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Test Date</label>
        <input
          type="date"
          value={testDate}
          onChange={(e) => setTestDate(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Mock Test ID</label>
        <input
          type="text"
          value={mockTestId}
          onChange={(e) => setMockTestId(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Changes
      </button>
      <button onClick={onCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2">
        Cancel
      </button>
    </form>
  );
};

export default EditResultForm;
