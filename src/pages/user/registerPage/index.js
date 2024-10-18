import { useState } from "react";

const RegisterForm = ({ toggleForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registration attempt with:", { name, email, password });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-600">
          Register for A-one Prep
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-6">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
            type="submit"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-blue-600">Already have an account? </span>
          <button
            className="text-green-500 hover:underline"
            onClick={() => toggleForm("login")}
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;
