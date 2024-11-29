import React, { useState, useEffect } from "react";

const EditQuestionForm = ({
  question, // The existing question data to edit
  onSave,   // Function to handle saving the updated question
  onCancel, // Function to handle cancel action
  mockTests, // List of mock tests to choose from
}) => {
  // Initialize form data based on the existing question
  const [formData, setFormData] = useState({
    description: question.description || "",
    optionA: question.optionA || "",
    optionB: question.optionB || "",
    optionC: question.optionC || "",
    optionD: question.optionD || "",
    answer: question.answer || "", // Store as a string to hold a single answer (A, B, C, D)
    mockTestId: question.mock_test_id || "",
  });

  // Update formData when question props change
  useEffect(() => {
    setFormData({
      description: question.description || "",
      optionA: question.optionA || "",
      optionB: question.optionB || "",
      optionC: question.optionC || "",
      optionD: question.optionD || "",
      answer: question.answer || "", // Ensure answer is a string
      mockTestId: question.mock_test_id || "",
    });
  }, [question]);

  // Handle input change for text fields and selects
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle change for correct answer (only one option can be selected)
  const handleAnswerChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      answer: e.target.value, // Set the answer to the selected option (A, B, C, or D)
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an updated question object
    const updatedQuestion = {
      ...question,
      description: formData.description,
      optionA: formData.optionA,
      optionB: formData.optionB,
      optionC: formData.optionC,
      optionD: formData.optionD,
      answer: formData.answer, // Store answer as a string (A, B, C, D)
      mock_test_id: formData.mockTestId,
      status: true, // Keep question active
    };

    // Pass updated question data to onSave
    onSave(updatedQuestion);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-6 rounded-lg shadow-md max-h-[500px] overflow-y-auto"
    >
      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Edit Question</h3>

      {/* Question Text */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Question Text</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="border border-gray-300 px-4 py-2 w-full rounded-lg"
          required
        />
      </div>

      {/* Answer Options */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Answer Options</label>
        {["A", "B", "C", "D"].map((option) => (
          <div key={option} className="mb-2">
            <label className="block text-sm text-gray-600 mb-1">Option {option}</label>
            <input
              type="text"
              name={`option${option}`}
              value={formData[`option${option}`]}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-2 w-full rounded-lg"
              required
            />
          </div>
        ))}
      </div>

      {/* Correct Answer */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Correct Answer</label>
        <div className="space-y-2">
          {["A", "B", "C", "D"].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio" // Changed to radio to allow only one answer to be selected
                name="answer"
                value={option}
                checked={formData.answer === option} // Only check the one that matches the answer
                onChange={handleAnswerChange} // Handle the radio button change
                className="mr-2"
              />
              Option {option}
            </label>
          ))}
        </div>
      </div>

      {/* Mock Test Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Mock Test</label>
        <select
          name="mockTestId"
          value={formData.mockTestId}
          onChange={handleInputChange}
          className="border border-gray-300 px-4 py-2 w-full rounded-lg"
          required
        >
          <option value="">Select Mock Test</option>
          {mockTests.map((test) => (
            <option key={test.id} value={test.id}>
              {test.name}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="text-red-500 px-4 py-2 border border-red-500 rounded-lg hover:bg-red-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Save Question
        </button>
      </div>
    </form>
  );
};

export default EditQuestionForm;
