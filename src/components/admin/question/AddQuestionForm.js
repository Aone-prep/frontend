import React, { useEffect, useState } from "react";
import { createQuestion } from "@services/admin/questions"; // Import API service
import { getMocktests } from "@services/admin/mockTest";

const AddQuestionForm = ({ onAdd, onCancel }) => {
  const [text, setText] = useState("");  // Question text
  const [optionA, setOptionA] = useState(""); // Option A
  const [optionB, setOptionB] = useState(""); // Option B
  const [optionC, setOptionC] = useState(""); // Option C
  const [optionD, setOptionD] = useState(""); // Option D
  const [correctAnswer, setCorrectAnswer] = useState(""); // Correct answer field
  const [mockTests, setMockTests] = useState([]);  // Mock tests list
  const [selectedMockTest, setSelectedMockTest] = useState("");  // Selected mock test

  // Fetch mock tests from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionMockTests = await getMocktests();
        setMockTests(questionMockTests || []);
      } catch (error) {
        console.error("Error fetching mock tests:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const questionData = {
        description: text,      // Question text
        optionA,                 // Option A
        optionB,                 // Option B
        optionC,                 // Option C
        optionD,                 // Option D
        answer: correctAnswer,   // Correct answer (e.g., 'optionA')
        mock_test_id: selectedMockTest,  // Selected mock test
        question_type_id: 2,     // Assuming multiple-choice type
        status: true,            // Active question status
      };

      // Call API to add question
      const response = await createQuestion(questionData);
      if (response && response.data) {
        onAdd(response.data);  // Notify parent about the new question
      }
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Add New Question</h3>

      {/* Question Text */}
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

      {/* Answer Options */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Answer Options</label>
        
        {/* Option A */}
        <input
          type="text"
          value={optionA}
          onChange={(e) => setOptionA(e.target.value)}
          placeholder="Option A"
          className="border border-gray-300 px-4 py-2 w-full rounded-lg mb-2"
          required
        />
        
        {/* Option B */}
        <input
          type="text"
          value={optionB}
          onChange={(e) => setOptionB(e.target.value)}
          placeholder="Option B"
          className="border border-gray-300 px-4 py-2 w-full rounded-lg mb-2"
          required
        />
        
        {/* Option C */}
        <input
          type="text"
          value={optionC}
          onChange={(e) => setOptionC(e.target.value)}
          placeholder="Option C"
          className="border border-gray-300 px-4 py-2 w-full rounded-lg mb-2"
          required
        />
        
        {/* Option D */}
        <input
          type="text"
          value={optionD}
          onChange={(e) => setOptionD(e.target.value)}
          placeholder="Option D"
          className="border border-gray-300 px-4 py-2 w-full rounded-lg mb-2"
          required
        />
      </div>

      {/* Correct Answer Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Correct Answer</label>
        <select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="border border-gray-300 px-4 py-2 w-full rounded-lg"
          required
        >
          <option value="">Select Correct Answer</option>
          <option value="A">Option A</option>
          <option value="B">Option B</option>
          <option value="C">Option C</option>
          <option value="D">Option D</option>
        </select>
      </div>

      {/* Mock Test Selection */}
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

      {/* Buttons to save or cancel */}
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
