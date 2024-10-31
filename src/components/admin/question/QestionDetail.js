import React from "react";

const QuestionDetail = ({ question, onClose }) => {
  if (!question) {
    return <p>Loading...</p>; // or return null to render nothing
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">Question Details</h3>
      <p className="mb-2">
        <strong>Question:</strong> {question.text}
      </p>
      <p className="mb-2">
        <strong>Type:</strong> {question.type}
      </p>
      <p className="mb-2">
        <strong>Answer:</strong>
        {question.type === "Multiple Choice" ? (
          <ul className="ml-4 list-disc">
            {question.answer.map((ans, index) => (
              <li key={index}>{ans}</li>
            ))}
          </ul>
        ) : (
          <span> {question.answer[0]}</span>
        )}
      </p>
      <p className="mb-2">
        <strong>Category:</strong> {question.category}
      </p>
      <p className="mb-2">
        <strong>Level:</strong> {question.level}
      </p>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QuestionDetail;
