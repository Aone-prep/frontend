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
  getQuestionTypes,
} from "@services/admin/questions"; // API services
import { getMocktests } from "@services/admin/mockTest";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [mockTests, setMockTests] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions();
        const questionTypesResponse = await getQuestionTypes();
        setQuestions(response || []);
        const questionMockTests = await getMocktests();
        setMockTests(questionMockTests || []);
        setQuestionTypes(questionTypesResponse || []);
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
      // Add `questionType` to the new question
      const questionType = questionTypes.find(
        (type) => type.id === newQuestion.questionTypeId
      );
      const newQuestionWithType = { ...newQuestion, questionType };

      const response = await createQuestion(newQuestionWithType);
      setQuestions([...questions, response.data]);
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
        questions.map((q) => (q.id === updatedQuestion.id ? response.data : q))
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

  const resolveAnswer = (question) => {
    if (question?.questionType?.name === "Single Choice") {
      const answerKey = question?.answer;
      return question[`option${answerKey}`];
    }
    return question?.answer || "N/A";
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
            <th className="p-4">Type</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={question.id} className="border-b">
              <td className="p-4">{index + 1}</td>
              <td className="p-4">{question?.description}</td>
              <td className="p-4">{resolveAnswer(question)}</td>
              <td className="p-4">{question?.questionType?.name}</td>
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
                  onClick={() => handleDeleteQuestion(question.id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
                questionTypes={questionTypes}
                mockTests={mockTests}
              />
            ) : (
              <AddQuestionForm
                onAdd={handleAddQuestion}
                onCancel={closeModal}
                questionTypes={questionTypes}
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
