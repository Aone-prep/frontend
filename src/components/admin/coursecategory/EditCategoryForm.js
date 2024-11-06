// EditCategoryForm.js

import React, { useState, useEffect } from "react";

const EditCategoryForm = ({ category, onSave, onCancel }) => {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert("Please fill in all fields.");
      return;
    }
    onSave({ ...category, name, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-4">Edit Category</h2>
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
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditCategoryForm;
