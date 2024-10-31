import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditCategoryForm from "./EditCategory";
import AddCategoryForm from "./AddCategoryForm";

const CategoryList = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Web Development",
      description: "Courses related to web development",
      totalCourses: 10,
    },
    {
      id: 2,
      name: "Programming",
      description: "Courses for various programming languages",
      totalCourses: 8,
    },
  ]);

  const [editingCategory, setEditingCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          setEditingCategory(null); // Set to null to open AddCategoryForm
          openModal();
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 float-right"
      >
        Add New Category
      </button>
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr className="text-left border-b">
            <th className="p-4">Name</th>
            <th className="p-4">Description</th>
            <th className="p-4">Total Courses</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b">
              <td className="p-4">{category.name}</td>
              <td className="p-4">{category.description}</td>
              <td className="p-4">{category.totalCourses}</td>
              <td className="p-4 text-center">
                <button
                  onClick={() => handleEditClick(category)}
                  className="text-yellow-500 mr-4"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="text-red-500 "
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
            {editingCategory ? (
              <EditCategoryForm
                category={editingCategory}
                onSave={editCategory}
                onCancel={closeModal}
              />
            ) : (
              <AddCategoryForm onAdd={addCategory} onCancel={closeModal} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
