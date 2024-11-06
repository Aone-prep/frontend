// EditQuestionCategoryForm.js

import React, { useState, useEffect } from "react";

const EditQuestionCategoryForm = ({ category, onSave, onCancel }) => {
  const [name, setName] = useState(category.name);
  const [status, setStatus] = useState(category.status);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setStatus(category.status);
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please enter a name.");
      return;
    }
    onSave({ ...category, name, status });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-4">Edit Question Category</h2>
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
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditQuestionCategoryForm;
