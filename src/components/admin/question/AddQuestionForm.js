import React, { useState } from "react";

const AddQuestionForm = ({ onAdd, onCancel }) => {
  const [text, setText] = useState("");
  const [type, setType] = useState("Single Answer");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [singleAnswer, setSingleAnswer] = useState(""); // For single answer type
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [showAllOption, setShowAllOption] = useState(false);
  const [selectedCourseCategory, setSelectedCourseCategory] = useState("");
  const [selectedMockTest, setSelectedMockTest] = useState("");

  // Dummy data for course categories and mock tests
  const courseCategories = [
    { id: "1", name: "Math" },
    { id: "2", name: "Science" },
    { id: "3", name: "History" }
  ];

  const mockTests = [
    { id: "1", name: "Mock Test 1" },
    { id: "2", name: "Mock Test 2" },
    { id: "3", name: "Mock Test 3" }
  ];

  const handleAddAnswer = () => {
    if (answers.length < 4) {
      setAnswers([...answers, ""]);
    }
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = answers.map((answer, i) =>
      i === index ? value : answer
    );
    setAnswers(updatedAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionData = {
      text,
      type,
      answer: type === "Single Answer" ? [singleAnswer] : [...answers, ...(showAllOption ? ["All of the Above"] : [])],
      category: selectedCourseCategory,
      mockTest: selectedMockTest,
      level
    };
    onAdd(questionData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Add New Question</h3>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Question Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter question here..."
          className="border border-gray-300 px-4 py-2 w-full rounded-lg"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Question Type</label>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            if (e.target.value === "Single Answer") {
              setShowAllOption(false);
              setAnswers([""]); // Reset answers for single answer type
            }
          }}
          className="border border-gray-300 px-4 py-2 w-full rounded-lg"
        >
          <option value="Single Answer">Single Answer</option>
          <option value="Multiple Choice">Multiple Choice</option>
        </select>
      </div>

      {type === "Single Answer" ? (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Answer</label>
          <input
            type="text"
            value={singleAnswer}
            onChange={(e) => setSingleAnswer(e.target.value)}
            placeholder="Enter single answer here..."
            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
            required
          />
        </div>
      ) : (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Answer Options</label>
          {answers.map((answer, index) => (
            <input
              key={index}
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              className="border border-gray-300 px-4 py-2 w-full rounded-lg mb-2"
              required
            />
          ))}
          {answers.length < 4 && (
            <button
              type="button"
              onClick={handleAddAnswer}
              className="text-blue-500 hover:text-blue-700"
            >
              + Add Another Option
            </button>
          )}
          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={showAllOption}
                onChange={(e) => setShowAllOption(e.target.checked)}
                className="form-checkbox text-blue-500"
              />
              <span className="ml-2 text-gray-700">Include "All of the Above" as an option</span>
            </label>
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Course Category</label>
        <select
          value={selectedCourseCategory}
          onChange={(e) => setSelectedCourseCategory(e.target.value)}
          className="border border-gray-300 px-4 py-2 w-full rounded-lg"
          required
        >
          <option value="">Select Course Category</option>
          {courseCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Mock Test</label>
        <select
          value={selectedMockTest}
          onChange={(e) => setSelectedMockTest(e.target.value)}
          className="border border-gray-300 px-4 py-2 w-full rounded-lg"
          required
        >
          <option value="">Select Mock Test</option>
          {mockTests.map((mockTest) => (
            <option key={mockTest.id} value={mockTest.id}>
              {mockTest.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Level</label>
        <input
          type="text"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          placeholder="Enter level (e.g., Beginner, Intermediate)"
          className="border border-gray-300 px-4 py-2 w-full rounded-lg"
          required
        />
      </div>

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

export default AddQuestionForm;

