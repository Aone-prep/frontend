import React, { useState } from "react";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import AddMockTestForm from "./AddMockTestForm";
import EditMockTestForm from "./EditMockTestForm";
import MockTestDetail from "./MockTestDetail";

const MockTestList = () => {
  const [mockTests, setMockTests] = useState([
    {
      id: 1,
      name: "Mock Test 1",
      description: "This is a description for Mock Test 1",
      duration: 60,
      maxScore: 100,
      resultId: 201,
      courseName: "Course 1",
      status: "Active",
    },
  ]);

  const [editingMockTest, setEditingMockTest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedMockTest, setSelectedMockTest] = useState(null);

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

  const addMockTest = (mockTest) => {
    const newMockTest = {
      ...mockTest,
      id: mockTests.length + 1,
      courseName: "Course 1",
      status: "Active",
    };
    setMockTests([...mockTests, newMockTest]);
    closeModal();
  };

  const editMockTest = (updatedMockTest) => {
    setMockTests(
      mockTests.map((mt) => (mt.id === updatedMockTest.id ? updatedMockTest : mt))
    );
    closeModal();
  };

  const deleteMockTest = (id) => {
    setMockTests(mockTests.filter((mt) => mt.id !== id));
  };

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
            <th className="px-6 py-3 text-left">Course Name</th>
            <th className="px-6 py-3 text-left">Duration</th>
            <th className="px-6 py-3 text-left">Max Score</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockTests.map((mockTest) => (
            <tr key={mockTest.id} className="border-t">
              <td className="px-6 py-4">{mockTest.name}</td>
              <td className="px-6 py-4">{mockTest.description}</td>
              <td className="px-6 py-4">
                <select
                  value={mockTest.courseName}
                  onChange={(e) => {
                    const updatedMockTest = { ...mockTest, courseName: e.target.value };
                    editMockTest(updatedMockTest);
                  }}
                  className="border rounded p-2"
                >
                  <option>Course 1</option>
                  <option>Course 2</option>
                  <option>Course 3</option>
                </select>
              </td>
              <td className="px-6 py-4">{mockTest.duration} mins</td>
              <td className="px-6 py-4">{mockTest.maxScore}</td>
              <td className="px-6 py-4">{mockTest.status}</td>
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[40vw] relative z-60">
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
          <div className="bg-white p-4 rounded-lg shadow-lg w-[40vw] relative z-60">
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
