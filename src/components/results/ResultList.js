// src/components/admin/result/ResultList.js
import React, { useState } from "react";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import AddResultForm from "./AddResultForm";
import EditResultForm from "./EditResultForm";
import ResultDetail from "./ResultDetail";

const ResultList = () => {
  const [results, setResults] = useState([
    {
      id: 1,
      studentName: "John Doe",
      score: 80,
      testDate: "2024-11-12",
      mockTestId: 1,
    },
    // Add more result entries as needed
  ]);

  const [editingResult, setEditingResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingResult(null);
  };

  const openDetail = (result) => {
    setSelectedResult(result);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setSelectedResult(null);
  };

  const addResult = (result) => {
    const newResult = {
      ...result,
      id: results.length + 1,
    };
    setResults([...results, newResult]);
    closeModal();
  };

  const editResult = (updatedResult) => {
    setResults(
      results.map((res) => (res.id === updatedResult.id ? updatedResult : res))
    );
    closeModal();
  };

  const deleteResult = (id) => {
    setResults(results.filter((res) => res.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => {
          setEditingResult(null);
          openModal();
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 float-right"
      >
        Add New Result
      </button>
      <h2 className="text-2xl font-bold mb-4">Results</h2>

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-6 py-3 text-left">Student Name</th>
            <th className="px-6 py-3 text-left">Score</th>
            <th className="px-6 py-3 text-left">Test Date</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id} className="border-t">
              <td className="px-6 py-4">{result.studentName}</td>
              <td className="px-6 py-4">{result.score}</td>
              <td className="px-6 py-4">{result.testDate}</td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => setEditingResult(result)}
                  className="text-yellow-500 mr-4"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteResult(result.id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => openDetail(result)}
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
          <div className="bg-white p-4 rounded-lg shadow-lg w-[40vw] relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            {editingResult ? (
              <EditResultForm result={editingResult} onSave={editResult} onCancel={closeModal} />
            ) : (
              <AddResultForm onAdd={addResult} onCancel={closeModal} />
            )}
          </div>
        </div>
      )}

      {isDetailOpen && selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[40vw] relative">
            <button
              onClick={closeDetail}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <ResultDetail result={selectedResult} onClose={closeDetail} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultList;
