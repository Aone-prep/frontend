import React, { useState } from "react";

const EditMockTestForm = ({ mockTest, onSave, onCancel }) => {
  const [name, setName] = useState(mockTest.name);
  const [description, setDescription] = useState(mockTest.description);
  const [duration, setDuration] = useState(mockTest.duration);
  const [maxScore, setMaxScore] = useState(mockTest.maxScore);
  const [courseName, setCourseName] = useState(mockTest.courseName || "Course 1");
  const [status, setStatus] = useState(mockTest.status || "Active");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...mockTest,
      name,
      description,
      duration,
      maxScore,
      courseName,
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold mb-4">Edit Mock Test</h3>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Duration (mins)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Max Score</label>
        <input
          type="number"
          value={maxScore}
          onChange={(e) => setMaxScore(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Course Name</label>
        <select
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        >
          <option>Course 1</option>
          <option>Course 2</option>
          <option>Course 3</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Changes
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditMockTestForm;
