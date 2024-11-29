import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import EditUserForm from "./EditUserForm";
import AddUserForm from "./AddUserForm";
import { deleteUser, getAllUsers } from "@services/admin/users";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  console.log(editingUser)
  // Fetch users from API
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleAddUser = (user) => {
    setUsers([...users, user]);
    closeModal();
  };

  const handleEditUser = (updatedUser,id) => {
    setUsers(
      users.map((user) => (user.id === id ? {...updatedUser,id} : user))
    );
    closeModal();
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    openModal();
  };

  return (
    <div>
      <button
        onClick={() => {
          setEditingUser(null);
          openModal();
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 float-right"
      >
        Add New User
      </button>
      <h2 className="text-xl font-bold mb-4">User List</h2>
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr className="text-left border-b">
            <th className="p-4">SN</th>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border-b">
              <td className="p-4">{index + 1}</td>
              <td className="p-4">
                {user?.first_name} {user?.last_name}
              </td>
              <td className="p-4">{user.email}</td>
              <td className="p-4 text-center">
                <button
                  onClick={() => handleEditClick(user)}
                  className="text-yellow-500 mr-4"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-500"
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
          <div className="bg-white p-2 rounded-lg shadow-lg w-[40vw] relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            {editingUser ? (
              <EditUserForm
                user={editingUser}
                onSave={handleEditUser}
                onCancel={closeModal}
              />
            ) : (
              <AddUserForm onAdd={handleAddUser} onCancel={closeModal} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
