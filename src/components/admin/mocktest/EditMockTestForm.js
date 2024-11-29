import React, { useState, useEffect } from "react";
import { updateMocktest } from "@services/admin/mockTest";  // Import the API call

const EditMockTestForm = ({ mockTest, onSave, onCancel }) => {
  const [name, setName] = useState(mockTest.name);
  const [description, setDescription] = useState(mockTest.description);
  const [duration, setDuration] = useState(mockTest.duration);
  const [maxScore, setMaxScore] = useState(mockTest.maxScore);
  const [courseName, setCourseName] = useState(mockTest.courseName || "Course 1");
  const [status, setStatus] = useState(mockTest.status || "Active");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Reset state if mockTest prop changes (optional)
    setName(mockTest.name);
    setDescription(mockTest.description);
    setDuration(mockTest.duration);
    setMaxScore(mockTest.maxScore);
    setCourseName(mockTest.courseName || "Course 1");
    setStatus(mockTest.status || "Active");
  }, [mockTest]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const updatedMockTest = {
      name,
      description,
      duration,
      maxScore,
      courseName,
      status,
    };

    try {
      // Make API call to update the mock test
      const result = await updateMocktest(mockTest.id, updatedMockTest);

      // Pass the updated mock test back to parent component
      onSave(result);

      // Close the form/modal
      onCancel();
    } catch (err) {
      setError("An error occurred while updating the mock test. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Edit Mock Test</h3>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 mb-4">
          <p>{error}</p>
        </div>
      )}

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

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-3"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`${
            loading ? "bg-gray-400" : "bg-blue-600"
          } text-white px-6 py-2 rounded-lg hover:bg-blue-700`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EditMockTestForm;
