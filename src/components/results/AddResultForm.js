import React, { useState } from "react";

const AddResultForm = ({ onAdd, onCancel }) => {
  const [studentName, setStudentName] = useState("");
  const [description, setDescription] = useState("");  // New field
  const [obtainedMarks, setObtainedMarks] = useState("");  // New field
  const [passMark, setPassMark] = useState("");  // New field
  const [fullMark, setFullMark] = useState("");  // New field
  const [mockTestName, setMockTestName] = useState("");  // New field

  const handleSubmit = (e) => {
    e.preventDefault();
    const newResult = {
      studentName,
      description,
      obtainedMarks,
      passMark,
      fullMark,
      mockTestName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onAdd(newResult); // Pass the new result to the parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Student Name</label>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter student name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Obtained Marks</label>
        <input
          type="number"
          value={obtainedMarks}
          onChange={(e) => setObtainedMarks(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Pass Mark</label>
        <input
          type="number"
          value={passMark}
          onChange={(e) => setPassMark(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Full Mark</label>
        <input
          type="number"
          value={fullMark}
          onChange={(e) => setFullMark(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Mock Test Name</label>
        <input
          type="text"
          value={mockTestName}
          onChange={(e) => setMockTestName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Result
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddResultForm;
