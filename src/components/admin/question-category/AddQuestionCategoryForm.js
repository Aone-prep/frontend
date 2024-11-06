// AddQuestionCategoryForm.js

import React, { useState } from "react";

const AddQuestionCategoryForm = ({ onAdd, onCancel }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please enter a name.");
      return;
    }
    onAdd({ name, status });
    setName("");
    setStatus("active");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-4">Add New Question Category</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <select
          className="w-full p-2 border rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="mr-2 px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Category
        </button>
      </div>
    </form>
  );
};

export default AddQuestionCategoryForm;
