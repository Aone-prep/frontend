import React, { useState, useEffect } from "react";
import UserList from "./UserList";
// import AddUserForm from "./AddUserForm";
// import EditUserForm from "./EditUserForm";
import Sidebar from "./Sidebar";
import CourseList from "./course/CourseList";
import QuestionList from "./question/QuestionList";
import CategoryList from "./coursecategory/CategoryList";
import QuestionTypeList from "./question-category/QuestionTypeList";
import AddMockTestForm from "./mocktest/AddMockTestForm"; // Import AddMockTestForm
import MockTestList from "./mocktest/MockTestList";
import ResultList from "@components/results/ResultList";
import CourseContentList from "./coursecontent/CourseContentList";
import { getAllUsers } from "@services/admin/users";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        console.log(response);
        setUsers(response || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, []);

  const [mockTests, setMockTests] = useState([]); // State to manage mock tests
  const [editingUser, setEditingUser] = useState(null);
  const [currentView, setCurrentView] = useState("dashboard");

  const addUser = (user) => {
    const newUser = { ...user, id: users.length + 1 };
    setUsers([...users, newUser]);
  };

  const editUser = (user) => {
    setUsers(users.map((u) => (u.id === user.id ? user : u)));
    setEditingUser(null);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleAddMockTest = (mockTestData) => {
    setMockTests([...mockTests, mockTestData]);
    setCurrentView("dashboard"); // Switch back to dashboard view after adding
  };

  const handleCancelMockTest = () => {
    setCurrentView("dashboard"); // Go back to the dashboard or another relevant view
  };

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-500 text-white p-6 rounded shadow-md">
                <h3 className="text-lg font-semibold">Total Users</h3>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
              <div className="bg-green-500 text-white p-6 rounded shadow-md">
                <h3 className="text-lg font-semibold">Active Users</h3>
                <p className="text-3xl font-bold">
                  {users.filter((user) => user.status == 1).length}
                </p>
              </div>
              <div className="bg-red-500 text-white p-6 rounded shadow-md">
                <h3 className="text-lg font-semibold">Disabled Users</h3>
                <p className="text-3xl font-bold">
                  {users.filter((user) => user.status == 0).length}
                </p>
              </div>
            </div>
          </div>
        );
      case "users":
        return (
          <>
            <UserList
              users={users}
              onEdit={(user) => setEditingUser(user)}
              onDelete={deleteUser}
            />
          </>
        );
      case "mocktests": // Add case for Mock Tests
        return (
          <AddMockTestForm
            onAdd={handleAddMockTest}
            onCancel={handleCancelMockTest}
          />
        );
      case "courses":
        return <CourseList />;
      case "categories":
        return <CategoryList />;
      case "questions":
        return <QuestionList />;
      case "question-categories":
        return <QuestionTypeList/>;
      case "mock-test":
        return <MockTestList />;
      case "results":
        return <ResultList />;
      case "coursecontent":
        return <CourseContentList />;
      case "settings":
        return <h2 className="text-2xl font-bold">Settings Page</h2>;
      default:
        return <h2 className="text-2xl font-bold">Page Not Found</h2>;
    }
  };

  return (
    <div className="flex">
      <Sidebar onSelect={setCurrentView} />
      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;
