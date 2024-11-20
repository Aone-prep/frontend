import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash,FaInfoCircle } from "react-icons/fa";
import AddCategoryForm from "./AddCategoryForm";
import EditCategoryForm from "./EditCategoryForm";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@services/admin/coursecategory";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch initial categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const openDetail = (category) => {
    setSelectedCategory(category);
  };

  const closeDetail = () => {
    setSelectedCategory(null);
  };

  const handleAddCategory = async (category) => {
    try {
      const newCategory = await createCategory(category);
      setCategories([...categories, newCategory]);
      closeModal();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleEditCategory = async (updatedCategory) => {
    try {
      const updated = await updateCategory(updatedCategory.id, updatedCategory);
      setCategories(
        categories.map((category) =>
          category.id === updated.id ? updated : category
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    openModal();
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
      <h2 className="text-xl font-bold mb-4">Category List</h2>
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr className="text-left border-b">
            <th className="p-4">Name</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b">
              <td className="p-4">{category.category_name}</td>
              <td className="p-4 text-center">
                <button
                  onClick={() => openDetail(category)}
                  className="text-blue-500 mr-4"
                >
                  <FaInfoCircle />
                </button>
                <button
                  onClick={() => handleEditClick(category)}
                  className="text-yellow-500 mr-4"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit */}
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
                onSave={handleEditCategory}
                onCancel={closeModal}
              />
            ) : (
              <AddCategoryForm onAdd={handleAddCategory} onCancel={closeModal} />
            )}
          </div>
        </div>
      )}

      {/* Category Detail Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[40vw] relative">
            <button
              onClick={closeDetail}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <div>
              <h3 className="text-xl font-bold mb-4">Category Detail</h3>
              <p><strong>Name:</strong> {selectedCategory.category_name}</p>
              <p><strong>Created At:</strong> {selectedCategory.createdAt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
