import React, { useState } from "react";
import { updateCategory } from "@services/admin/coursecategory";

const EditCategoryForm = ({ category, onSave, onCancel }) => {
  const [name, setName] = useState(category.category_name); // Initialize state with category_name

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please fill in all fields.");
      return;
    }
    const updatedCategory = { category_name: name };
    try {
      const response = await updateCategory(category.id, updatedCategory);
      onSave(response?.category); // Pass the updated category back to the parent
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-4">Edit Category</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={name} // Bind to state
          onChange={(e) => setName(e.target.value)} // Update state on change
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
