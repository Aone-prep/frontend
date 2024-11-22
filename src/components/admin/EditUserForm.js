import React, { useState, useEffect } from "react";
import { updateUser } from "@services/admin/users";

const EditUserForm = ({ user, onSave, onCancel }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [roles] = useState(["admin", "user"]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Populate the form with the existing user details
    setFirstName(user.first_name || "");
    setLastName(user.last_name || "");
    setUsername(user.username || "");
    setEmail(user.email || "");
    setRole(user.role || "user");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedUser = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      role,
    };

    try {
      const response = await updateUser(user.id, updatedUser);
      onSave(response); // Pass the updated user data back
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>

      {/* First Name Field */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      {/* Last Name Field */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      {/* Username Field */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      {/* Role Field */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 w-full rounded"
          required
        >
          {roles.map((roleOption) => (
            <option key={roleOption} value={roleOption}>
              {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            isSubmitting
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-green-700"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
