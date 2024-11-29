import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import EditQuestionForm from "./EditQuestionForm";
import AddQuestionForm from "./AddQuestionForm";
import QuestionDetail from "./QuestionDetail";
import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "@services/admin/questions"; // API services
import { getMocktests } from "@services/admin/mockTest"; // API service for mock tests

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [mockTests, setMockTests] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5; // Set how many questions to show per page

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions();
        const mockTestsResponse = await getMocktests();
        setQuestions(response || []);
        setMockTests(mockTestsResponse || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  const openDetail = (question) => {
    setSelectedQuestion(question);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setSelectedQuestion(null);
  };

  const handleAddQuestion = async (newQuestion) => {
    try {
      setQuestions([...questions, newQuestion]);
      closeModal();
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleEditQuestion = async (updatedQuestion) => {
    try {
      const response = await updateQuestion(
        updatedQuestion.id,
        updatedQuestion
      );
      setQuestions(
        currentQuestions.map((q) =>
          q.id === updatedQuestion.id ? response : q
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter((q) => q.id !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleEditClick = (question) => {
    setEditingQuestion(question);
    openModal();
  };

  // Pagination Logic
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Map the answer option to the correct option text
  const resolveAnswer = (question) => {
    const answerKey = question?.answer; // "A", "B", "C", "D"
    if (answerKey) {
      return question[`option${answerKey}`]; // Fetch the answer option text
    }
    return "N/A";
  };

  // Fetch the Mock Test name by matching the mock_test_id
  const resolveMockTestName = (mockTestId) => {
    const mockTest = mockTests?.find((test) => test.id === mockTestId);
    return mockTest ? mockTest.name : "N/A";
  };

  return (
    <div>
      <button
        onClick={() => {
          setEditingQuestion(null);
          openModal();
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 float-right"
      >
        Add New Question
      </button>
      <h2 className="text-xl font-bold mb-4">Questions</h2>
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr className="text-left border-b">
            <th className="p-4">SN</th>
            <th className="p-4">Question</th>
            <th className="p-4">Answer</th>
            <th className="p-4">Mock Test</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentQuestions.map((question, index) => (
            <tr key={question.id} className="border-b">
              <td className="p-4">{index + 1 + indexOfFirstQuestion}</td>
              <td className="p-4">{question?.description}</td>
              <td className="p-4">{resolveAnswer(question)}</td>
              <td className="p-4">
                {resolveMockTestName(question?.mock_test_id)}
              </td>
              <td className="p-4 text-center">
                <button
                  onClick={() => openDetail(question)}
                  className="text-blue-500 mr-4"
                >
                  <FaInfoCircle />
                </button>
                <button
                  onClick={() => handleEditClick(question)}
                  className="text-yellow-500 mr-4"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteQuestion(question?.id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastQuestion >= questions.length}
          className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg"
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[40vw] relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            {editingQuestion ? (
              <EditQuestionForm
                question={editingQuestion}
                onSave={handleEditQuestion}
                onCancel={closeModal}
                mockTests={mockTests}
              />
            ) : (
              <AddQuestionForm
                onAdd={handleAddQuestion}
                onCancel={closeModal}
              />
            )}
          </div>
        </div>
      )}
      {isDetailOpen && selectedQuestion && (
        <QuestionDetail question={selectedQuestion} onClose={closeDetail} />
      )}
    </div>
  );
};

export default QuestionList;
