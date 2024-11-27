import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import AddQuestionTypeForm from "./AddQuestionTypeForm";
import EditQuestionTypeForm from "./EditQuestionTypeForm";
import { getQuestionTypes, createQuestionType, updateQuestionType, deleteQuestionType } from "@services/admin/questionType";

const QuestionTypeList = () => {
  const [questionTypes, setQuestionTypes] = useState([]);
  const [editingQuestionType, setEditingQuestionType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch question types from API
  useEffect(() => {
    const fetchQuestionTypes = async () => {
      try {
        const response = await getQuestionTypes();
        setQuestionTypes(response || []);
      } catch (error) {
        console.error("Error fetching question types:", error);
      }
    };
    fetchQuestionTypes();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingQuestionType(null);
  };

  const handleAddQuestionType = async (questionType) => {
    try {
      const newQuestionType = await createQuestionType(questionType);
      setQuestionTypes([...questionTypes, newQuestionType]);
      closeModal();
    } catch (error) {
      console.error("Error adding question type:", error);
    }
  };

  const handleEditQuestionType = async (updatedQuestionType) => {
    try {
      const response = await updateQuestionType(updatedQuestionType.id, updatedQuestionType);
      setQuestionTypes(
        questionTypes.map((type) =>
          type.id === updatedQuestionType.id ? updatedQuestionType : type
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error updating question type:", error);
    }
  };

  const handleDeleteQuestionType = async (id) => {
    try {
      await deleteQuestionType(id);
      setQuestionTypes(questionTypes.filter((type) => type.id !== id));
    } catch (error) {
      console.error("Error deleting question type:", error);
    }
  };

  const handleEditClick = (questionType) => {
    setEditingQuestionType(questionType);
    openModal();
  };

  return (
    <div>
      <button
        onClick={() => {
          setEditingQuestionType(null);
          openModal();
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 float-right"
      >
        Add New Question Type
      </button>
      <h2 className="text-xl font-bold mb-4">Question Types</h2>
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr className="text-left border-b">
            <th className="p-4">Name</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questionTypes.map((type) => (
            <tr key={type.id} className="border-b">
              <td className="p-4">{type.name}</td>
              <td className="p-4 text-center">
                <button
                  onClick={() => handleEditClick(type)}
                  className="text-yellow-500 mr-4"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteQuestionType(type.id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[40vw] relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            {editingQuestionType ? (
              <EditQuestionTypeForm
                questionType={editingQuestionType}
                onSave={handleEditQuestionType}
                onCancel={closeModal}
              />
            ) : (
              <AddQuestionTypeForm
                onAdd={handleAddQuestionType}
                onCancel={closeModal}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionTypeList;
