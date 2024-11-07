// import React, { useState } from "react";
// import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
// import EditQuestionForm from "./EditQuestionForm";
// import AddQuestionForm from "./AddQuestionForm";
// import QuestionDetail from "./QuestionDetail";

// const QuestionList = () => {
//   const [questions, setQuestions] = useState([
//     {
//       id: 1,
//       text: "What is React?",
//       type: "Single Answer",
//       answer: ["React is a JavaScript library for building user interfaces."],
//       category: "JavaScript",
//       level: "Beginner",
//     },
//     {
//       id: 2,
//       text: "Which of these are JavaScript frameworks?",
//       type: "Multiple Choice",
//       answer: ["React", "Angular", "Vue", "Spring"],
//       category: "JavaScript",
//       level: "Intermediate",
//     },
//   ]);

//   const [editingQuestion, setEditingQuestion] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDetailOpen, setIsDetailOpen] = useState(false);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditingQuestion(null);
//   };

//   const handleViewQuestion = (question) => {
//     setSelectedQuestion(question);
//     openDetail(question);
//   };

//   const openDetail = (question) => {
//     setSelectedQuestion(question);
//     setIsDetailOpen(true);
//   };

//   const closeDetail = () => {
//     setIsDetailOpen(false);
//     setSelectedQuestion(null);
//   };

//   const addQuestion = (question) => {
//     const newQuestion = { ...question, id: questions.length + 1 };
//     setQuestions([...questions, newQuestion]);
//     closeModal();
//   };

//   const handleEditClick = (question) => {
//     setEditingQuestion(question);
//     openModal();
//   };

//   const editQuestion = (updatedQuestion) => {
//     setQuestions(
//       questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
//     );
//     closeModal();
//   };

//   const deleteQuestion = (id) => {
//     setQuestions(questions.filter((q) => q.id !== id));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <button
//         onClick={() => {
//           setEditingQuestion(null);
//           openModal();
//         }}
//         className="bg-blue-600 text-white px-4 py-2 rounded mb-4 float-right"
//       >
//         Add New Question
//       </button>
//       <h2 className="text-2xl font-bold mb-4">Questions</h2>

//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr className="bg-gray-100 text-gray-700">
//             <th className="px-6 py-3 text-left">Question</th>
//             <th className="px-6 py-3 text-left">Type</th>
//             <th className="px-6 py-3 text-left">Category</th>
//             <th className="px-6 py-3 text-left">Level</th>
//             <th className="px-6 py-3 text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {questions.map((question) => (
//             <tr key={question.id} className="border-t">
//               <td className="px-6 py-4">{question.text}</td>
//               <td className="px-6 py-4">{question.type}</td>
//               <td className="px-6 py-4">{question.category}</td>
//               <td className="px-6 py-4">{question.level}</td>
//               <td className="px-6 py-4 text-center">
//                 <button
//                   onClick={() => handleEditClick(question)}
//                   className="text-yellow-500 mr-4"
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   onClick={() => deleteQuestion(question.id)}
//                   className="text-red-500"
//                 >
//                   <FaTrash />
//                 </button>
//                 <button
//                   onClick={() => handleViewQuestion(question)}
//                   className="text-blue-500 ml-4"
//                 >
//                   <FaInfoCircle />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-4 rounded-lg shadow-lg w-[40vw] relative">
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
//             >
//               ✕
//             </button>
//             {editingQuestion ? (
//               <EditQuestionForm
//                 question={editingQuestion}
//                 onSave={editQuestion}
//                 onCancel={closeModal}
//               />
//             ) : (
//               <AddQuestionForm onAdd={addQuestion} onCancel={closeModal} />
//             )}
//           </div>
//         </div>
//       )}

//       {isDetailOpen && selectedQuestion && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-4 rounded-lg shadow-lg w-[40vw] relative">
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
//             >
//               ✕
//             </button>
//             <QuestionDetail question={selectedQuestion} onClose={closeDetail} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionList;





import React, { useState } from "react";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import EditQuestionForm from "./EditQuestionForm";
import AddQuestionForm from "./AddQuestionForm";
import QuestionDetail from "./QuestionDetail";

const QuestionList = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "What is React?",
      type: "Single Answer",
      answer: ["React is a JavaScript library for building user interfaces."],
      category: "JavaScript",
      level: "Beginner",
      mockTestId: "MT101",
      questionTypeId: "QT1",
      createdBy: "Admin",
      status: "Active",
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    },
    {
      id: 2,
      text: "Which of these are JavaScript frameworks?",
      type: "Multiple Choice",
      answer: ["React", "Angular", "Vue", "Spring"],
      category: "JavaScript",
      level: "Intermediate",
      mockTestId: "MT102",
      questionTypeId: "QT2",
      createdBy: "Admin",
      status: "Inactive",
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    },
  ]);

  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  const handleViewQuestion = (question) => {
    setSelectedQuestion(question);
    openDetail(question);
  };

  const openDetail = (question) => {
    setSelectedQuestion(question);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setSelectedQuestion(null);
  };

  const addQuestion = (question) => {
    const newQuestion = {
      ...question,
      id: questions.length + 1,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };
    setQuestions([...questions, newQuestion]);
    closeModal();
  };

  const handleEditClick = (question) => {
    setEditingQuestion(question);
    openModal();
  };

  const editQuestion = (updatedQuestion) => {
    setQuestions(
      questions.map((q) =>
        q.id === updatedQuestion.id
          ? { ...updatedQuestion, updatedAt: new Date().toLocaleString() }
          : q
      )
    );
    closeModal();
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => {
          setEditingQuestion(null);
          openModal();
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 float-right"
      >
        Add New Question
      </button>
      <h2 className="text-2xl font-bold mb-4">Questions</h2>

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-6 py-3 text-left">Question</th>
            <th className="px-6 py-3 text-left">Type</th>
            <th className="px-6 py-3 text-left">Category</th>
            <th className="px-6 py-3 text-left">Level</th>
            <th className="px-6 py-3 text-left">Mock Test ID</th>
            <th className="px-6 py-3 text-left">Question Type ID</th>
            <th className="px-6 py-3 text-left">Created By</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Created At</th>
            <th className="px-6 py-3 text-left">Updated At</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id} className="border-t">
              <td className="px-6 py-4">{question.text}</td>
              <td className="px-6 py-4">{question.type}</td>
              <td className="px-6 py-4">{question.category}</td>
              <td className="px-6 py-4">{question.level}</td>
              <td className="px-6 py-4">{question.mockTestId}</td>
              <td className="px-6 py-4">{question.questionTypeId}</td>
              <td className="px-6 py-4">{question.createdBy}</td>
              <td className="px-6 py-4">{question.status}</td>
              <td className="px-6 py-4">{question.createdAt}</td>
              <td className="px-6 py-4">{question.updatedAt}</td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => handleEditClick(question)}
                  className="text-yellow-500 mr-4"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteQuestion(question.id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => handleViewQuestion(question)}
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
            {editingQuestion ? (
              <EditQuestionForm
                question={editingQuestion}
                onSave={editQuestion}
                onCancel={closeModal}
              />
            ) : (
              <AddQuestionForm onAdd={addQuestion} onCancel={closeModal} />
            )}
          </div>
        </div>
      )}

      {isDetailOpen && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[40vw] relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <QuestionDetail question={selectedQuestion} onClose={closeDetail} />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionList;

