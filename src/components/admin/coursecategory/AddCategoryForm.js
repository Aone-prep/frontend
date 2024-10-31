import React, { useState } from "react";

const AddCategoryForm = ({ onAdd, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      name,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Category</h2>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-semibold">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
          rows="4"
          required
        ></textarea>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Category
        </button>
      </div>
    </form>
  );
};

export default AddCategoryForm;
