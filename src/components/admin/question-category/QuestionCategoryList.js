// QuestionCategoryList.js

import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddQuestionCategoryForm from "./AddQuestionCategoryForm";
import EditQuestionCategoryForm from "./EditQuestionCategoryForm";

const QuestionCategoryList = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "General Knowledge", status: "active" },
    { id: 2, name: "Science", status: "inactive" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const addCategory = (category) => {
    const newCategory = { ...category, id: categories.length + 1 };
    setCategories([...categories, newCategory]);
    closeModal();
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    openModal();
  };

  const editCategory = (updatedCategory) => {
    setCategories(
      categories.map((c) => (c.id === updatedCategory.id ? updatedCategory : c))
    );
    closeModal();
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div>
      <button
        onClick={() => {
          setEditingCategory(null);
          openModal();
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 float-right"
      >
        Add New Category
      </button>
      <h2 className="text-xl font-bold mb-4">Question Categories</h2>
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr className="text-left border-b">
            <th className="p-4">Name</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b">
              <td className="p-4">{category.name}</td>
              <td className="p-4">{category.status}</td>
              <td className="p-4 text-center">
                <button
                  onClick={() => handleEditClick(category)}
                  className="text-yellow-500 mr-4"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteCategory(category.id)}
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
            {editingCategory ? (
              <EditQuestionCategoryForm
                category={editingCategory}
                onSave={editCategory}
                onCancel={closeModal}
              />
            ) : (
              <AddQuestionCategoryForm
                onAdd={addCategory}
                onCancel={closeModal}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCategoryList;
