import React, { useState, useEffect } from "react";

const EditQuestionTypeForm = ({ questionType, onSave, onCancel }) => {
  const [name, setName] = useState(questionType?.name || "");

  // Update state when the questionType prop changes
  useEffect(() => {
    if (questionType) {
      setName(questionType.name);
    }
  }, [questionType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a valid name.");
      return;
    }
    // Pass the updated questionType object to the parent
    onSave({ ...questionType, name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-4">Edit Question Type</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

export default EditQuestionTypeForm;
