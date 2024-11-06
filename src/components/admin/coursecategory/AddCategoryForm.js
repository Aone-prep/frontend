// AddCategoryForm.js

import React, { useState } from "react";

const AddCategoryForm = ({ onAdd, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert("Please fill in all fields.");
      return;
    }
    onAdd({ name, description });
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-4">Add New Category</h2>
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
        <label className="block text-gray-700">Description</label>
        <textarea
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
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

export default AddCategoryForm;
