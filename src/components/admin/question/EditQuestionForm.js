import React, { useState, useEffect } from "react";

const EditQuestionForm = ({
  question,
  onSave,
  onCancel,
  mockTests,
  questionTypes,
}) => {
  // Initialize form state based on question type
  const isSingleChoice = question.questionType.name === "Single Choice";

  const [formData, setFormData] = useState({
    description: question.description || "",
    type: isSingleChoice ? "Single Choice" : "Multiple Choice",
    optionA: question.optionA || "",
    optionB: question.optionB || "",
    optionC: question.optionC || "",
    optionD: question.optionD || "",
    answer: question.answer || (isSingleChoice ? "A" : []),
    mockTestId: question.mock_test_id || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedQuestion = {
      ...question,
      description: formData.description,
      optionA: formData.optionA,
      optionB: formData.optionB,
      optionC: formData.optionC,
      optionD: formData.optionD,
      answer: formData.answer,
      mock_test_id: formData.mockTestId,
      question_type_id: formData.type === "Single Choice" ? 2 : 1,
      status: true,
    };

    onSave(updatedQuestion);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-6 rounded-lg shadow-md"
    >
      <h3 className="text-2xl font-semibold mb-6 text-blue-600">
        Edit Question
      </h3>

      {/* Question Text */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Question Text
        </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="border border-gray-300 px-4 py-2 w-full rounded-lg"
          required
        />
      </div>

      {/* Question Type */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Question Type
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="border border-gray-300 px-4 py-2 w-full rounded-lg"
        >
          <option value="Single Choice">Single Choice</option>
          <option value="Multiple Choice">Multiple Choice</option>
        </select>
      </div>

      {/* Options */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Answer Options
        </label>
        {["A", "B", "C", "D"].map((option) => (
          <div key={option} className="mb-2">
            <label className="block text-sm text-gray-600 mb-1">
              Option {option}
            </label>
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
        <label className="block text-gray-700 font-medium mb-2">
          Correct Answer
        </label>
        {formData.type === "Single Choice" ? (
          <select
            name="answer"
            value={formData.answer}
            onChange={handleInputChange}
            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
            required
          >
            <option value="">Select correct answer</option>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
            <option value="C">Option C</option>
            <option value="D">Option D</option>
          </select>
        ) : (
          <div className="space-y-2">
            {["A", "B", "C", "D"].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.answer.includes(option)}
                  onChange={(e) => {
                    const newAnswer = e.target.checked
                      ? [...formData.answer, option]
                      : formData.answer.filter((a) => a !== option);
                    setFormData((prev) => ({ ...prev, answer: newAnswer }));
                  }}
                  className="mr-2"
                />
                Option {option}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Mock Test Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Mock Test
        </label>
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
