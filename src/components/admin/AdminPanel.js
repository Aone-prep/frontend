import React, { useState } from "react";
import UserList from "./UserList";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";
import Sidebar from "./Sidebar";
import EditCourseForm from "./course/EditCourseForm";
import AddCourseForm from "./course/AddCourseForm";
import CourseList from "./course/CourseList";

const AdminPanel = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);

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
                  {users.filter((user) => user.active).length}
                </p>
              </div>
              <div className="bg-red-500 text-white p-6 rounded shadow-md">
                <h3 className="text-lg font-semibold">Pending Requests</h3>
                <p className="text-3xl font-bold">5</p>{" "}
                {/* Placeholder count */}
              </div>
            </div>
          </div>
        );
      case "users":
        return (
          <>
            {editingUser ? (
              <EditUserForm
                user={editingUser}
                onSave={editUser}
                onCancel={() => setEditingUser(null)}
              />
            ) : (
              <AddUserForm onAdd={addUser} />
            )}
            <UserList
              users={users}
              onEdit={(user) => setEditingUser(user)}
              onDelete={deleteUser}
            />
          </>
        );

      case "courses":
        return (
          <>
            <CourseList />
          </>
        );
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
