import React, { useState } from "react";

const AddUserForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add User</button>
      </form>
    </div>
  );
};

export default AddUserForm;
