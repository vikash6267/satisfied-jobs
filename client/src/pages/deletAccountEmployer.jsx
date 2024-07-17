// DeleteUserForm.js

import { deletedEmployer } from '@/redux/actions/employeeAction';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


const DeleteUserForm = ({ deleteUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();
    // deleteUser({ email, password });
    dispatch(deletedEmployer({ email, password }))
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 px-4">
        <h1 className=' text-2xl font-semibold text-center mt-20 mb-5 '>Delet Company</h1>
      <div className="mb-4">
        <label className="block mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Delete User
      </button>
    </form>
  );
};

export default DeleteUserForm;
