import React, { useState } from "react";

const AddQuestionForm = ({ onAdd, onCancel }) => {
  const [text, setText] = useState("");
  const [type, setType] = useState("Single Answer");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");

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
      answer: answers,
      category,
      level,
    };
    onAdd(questionData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold mb-4">Add New Question</h3>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Question text"
        className="border px-2 py-1 mb-4 w-full"
        required
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border px-2 py-1 mb-4 w-full"
      >
        <option value="Single Answer">Single Answer</option>
        <option value="Multiple Choice">Multiple Choice</option>
      </select>
      {type === "Multiple Choice"
        ? answers.map((answer, index) => (
            <input
              key={index}
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder={`Answer option ${index + 1}`}
              className="border px-2 py-1 mb-2 w-full"
            />
          ))
        : answers.length > 0 && (
            <input
              type="text"
              value={answers[0]}
              onChange={(e) => setAnswers([e.target.value])}
              placeholder="Answer"
              className="border px-2 py-1 mb-4 w-full"
            />
          )}
      {type === "Multiple Choice" && answers.length < 4 && (
        <button
          type="button"
          onClick={handleAddAnswer}
          className="bg-gray-200 text-blue-500 px-4 py-2 rounded mb-4"
        >
          + Add Another Answer Option
        </button>
      )}
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="border px-2 py-1 mb-4 w-full"
      />
      <input
        type="text"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        placeholder="Level"
        className="border px-2 py-1 mb-4 w-full"
      />
      <div className="flex justify-end gap-4">
        <button type="button" onClick={onCancel} className="text-red-500">
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddQuestionForm;