import React, { useState } from "react";
import { createMocktest } from "@services/admin/mockTest"; // Import the API call

const AddMockTestForm = ({ onAdd, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [courseName, setCourseName] = useState("Course 1");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading spinner while submitting
    setLoading(true);
    setError("");

    try {
      // Create a new mock test using the API
      const mockTestData = { name, description, duration, maxScore, courseName, status:status==="Active"?1:0};
      const newMockTest = await createMocktest(mockTestData);

      // Pass the new mock test data to the parent component (onAdd callback)
      onAdd(newMockTest);
      
      // Clear form and close modal
      setName("");
      setDescription("");
      setDuration("");
      setMaxScore("");
      setCourseName("Course 1");
      setStatus("Active");
      onCancel();  // Close the modal after successful submission
    } catch (err) {
      setError("An error occurred while creating the mock test.");
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Add Mock Test</h3>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="mb-5">
        <label className="block text-gray-600 font-medium mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter mock test name"
          required
        />
      </div>

      <div className="mb-5">
        <label className="block text-gray-600 font-medium mb-2">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter description"
          required
        />
      </div>

      <div className="mb-5">
        <label className="block text-gray-600 font-medium mb-2">Duration (mins)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter duration in minutes"
          required
        />
      </div>

      <div className="mb-5">
        <label className="block text-gray-600 font-medium mb-2">Max Score</label>
        <input
          type="number"
          value={maxScore}
          onChange={(e) => setMaxScore(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:border-blue-500"
          placeholder="Enter maximum score"
          required
        />
      </div>

      <div className="mb-5">
        <label className="block text-gray-600 font-medium mb-2">Course Name</label>
        <select
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:border-blue-500"
          required
        >
          <option>Course 1</option>
          <option>Course 2</option>
          <option>Course 3</option>
        </select>
      </div>

      <div className="mb-5">
        <label className="block text-gray-600 font-medium mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:border-blue-500"
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
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-3 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`${
            loading ? "bg-gray-400" : "bg-blue-600"
          } text-white px-6 py-2 rounded-lg hover:bg-blue-700`}
          disabled={loading} // Disable the button while submitting
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default AddMockTestForm;
