import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import AddMockTestForm from "./AddMockTestForm";
import EditMockTestForm from "./EditMockTestForm";
import MockTestDetail from "./MockTestDetail";
import {
  createMocktest,
  updateMocktest,
  deleteMocktest,
  getMocktests,
} from "@services/admin/mockTest"; // Importing the API functions

const MockTestList = () => {
  // State for managing mock tests and pagination
  const [mockTests, setMockTests] = useState([]);
  const [editingMockTest, setEditingMockTest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedMockTest, setSelectedMockTest] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page
  const [totalCount, setTotalCount] = useState(0); // Total number of mock tests for pagination

  useEffect(() => {
    const fetchMockTests = async () => {
      try {
        const response = await getMocktests(currentPage, pageSize);

        // Sort mock tests by `updatedAt` first, then `createdAt` in descending order
        const sortedMockTests = response.sort((a, b) => {
          const updatedDiff = new Date(b.updatedAt) - new Date(a.updatedAt);
          return updatedDiff !== 0
            ? updatedDiff
            : new Date(b.createdAt) - new Date(a.createdAt);
        });

        setMockTests(sortedMockTests);
        setTotalCount(response.length); // Assuming the response includes total count
      } catch (error) {
        console.error("Error fetching mock tests:", error);
      }
    };

    fetchMockTests();
  }, [currentPage, pageSize]); // Re-fetch when current page or page size changes

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMockTest(null);
  };

  const openDetail = (mockTest) => {
    setSelectedMockTest(mockTest);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setSelectedMockTest(null);
  };

  const addMockTest = async (mockTest) => {
    try {
      const newMockTest = await createMocktest(mockTest);
      setMockTests((prevMockTests) =>
        [...prevMockTests, newMockTest].sort((a, b) => {
          const updatedDiff = new Date(b.updatedAt) - new Date(a.updatedAt);
          return updatedDiff !== 0
            ? updatedDiff
            : new Date(b.createdAt) - new Date(a.createdAt);
        })
      );
      closeModal();
    } catch (error) {
      console.error("Error adding mock test:", error);
    }
  };

  const editMockTest = async (updatedMockTest) => {
    try {
      const updatedTest = await updateMocktest(
        updatedMockTest.id,
        updatedMockTest
      );
      setMockTests((prevMockTests) =>
        prevMockTests
          .map((mt) => (mt.id === updatedTest.id ? updatedTest : mt))
          .sort((a, b) => {
            const updatedDiff = new Date(b.updatedAt) - new Date(a.updatedAt);
            return updatedDiff !== 0
              ? updatedDiff
              : new Date(b.createdAt) - new Date(a.createdAt);
          })
      );
      closeModal();
    } catch (error) {
      console.error("Error updating mock test:", error);
    }
  };

  // Delete a mock test using the API
  const deleteMockTest = async (id) => {
    try {
      await deleteMocktest(id); // Call API to delete mock test
      setMockTests((prevMockTests) =>
        prevMockTests.filter((mt) => mt.id !== id)
      );
    } catch (error) {
      console.error("Error deleting mock test:", error);
    }
  };

  // Pagination controls
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(totalCount / pageSize)) {
      setCurrentPage(pageNumber);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => {
          setEditingMockTest(null);
          openModal();
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 float-right"
      >
        Add New Mock Test
      </button>
      <h2 className="text-2xl font-bold mb-4">Mock Tests</h2>

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Description</th>
            <th className="px-6 py-3 text-left">Duration</th>
            <th className="px-6 py-3 text-left">Max Score</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockTests.map((mockTest) => (
            <tr key={mockTest.id} className="border-t">
              <td className="px-6 py-4">{mockTest.name}</td>
              <td className="px-6 py-4">{mockTest.description}</td>
              <td className="px-6 py-4">{mockTest.duration} mins</td>
              <td className="px-6 py-4">{mockTest.max_score}</td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => setEditingMockTest(mockTest)}
                  className="text-yellow-500 mr-4"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteMockTest(mockTest.id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => openDetail(mockTest)}
                  className="text-blue-500 ml-4"
                >
                  <FaInfoCircle />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          Previous
        </button>
        <span className="flex items-center justify-center text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
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
            {editingMockTest ? (
              <EditMockTestForm
                mockTest={editingMockTest}
                onSave={editMockTest}
                onCancel={closeModal}
              />
            ) : (
              <AddMockTestForm onAdd={addMockTest} onCancel={closeModal} />
            )}
          </div>
        </div>
      )}

      {isDetailOpen && selectedMockTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[40vw] relative">
            <button
              onClick={closeDetail}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <MockTestDetail mockTest={selectedMockTest} onClose={closeDetail} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MockTestList;
