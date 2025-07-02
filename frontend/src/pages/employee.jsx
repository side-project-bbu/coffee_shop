// frontend/src/pages/employee.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

function Employee() {
  // Employees state
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    first_name: '',
    last_name: '',
    role: '',
    is_active: true
  });
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Modal and Animation State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Animate modal on open/close
  useEffect(() => {
    if (isModalOpen) {
      // When modal opens, make it visible to start the animation
      setIsModalVisible(true);
    } else {
      // When modal closes, the visibility is already handled by the close function
      // This is just for cleanup in case isModalOpen changes from other sources
      setIsModalVisible(false);
    }
  }, [isModalOpen]);

  // Function to handle closing the modal with animation
  const handleCloseModal = () => {
    // Start the exit animation
    setIsModalVisible(false);
    // Wait for the animation to finish before truly closing the modal
    setTimeout(() => {
      setIsModalOpen(false);
    }, 200); // This duration should match your CSS transition duration
  };


  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Employee functions
  const fetchEmployees = () => {
    axios.get('http://localhost:8000/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error("Error fetching employees:", error);
      });
  };

  const createEmployee = () => {
    if (!newEmployee.first_name.trim() || !newEmployee.last_name.trim() || !newEmployee.role.trim()) {
      alert('Please fill in first name, last name, and role');
      return;
    }

    axios.post('http://localhost:8000/api/employees', newEmployee)
      .then(response => {
        console.log(response.data.message);
        setNewEmployee({
          first_name: '',
          last_name: '',
          role: '',
          is_active: true
        });
        handleCloseModal(); // Close modal with animation
        fetchEmployees();
      })
      .catch(error => {
        console.error("Error creating employee:", error);
        alert('Error creating employee. Please try again.');
      });
  };

  const updateEmployee = (employeeId, updatedData) => {
    axios.put(`http://localhost:8000/api/employees/${employeeId}`, updatedData)
      .then(response => {
        console.log(response.data.message);
        setEditingEmployee(null);
        fetchEmployees();
      })
      .catch(error => {
        console.error("Error updating employee:", error);
        alert('Error updating employee. Please try again.');
      });
  };

  const deleteEmployee = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios.delete(`http://localhost:8000/api/employees/${employeeId}`)
        .then(response => {
          console.log(response.data.message);
          fetchEmployees();
        })
        .catch(error => {
          console.error("Error deleting employee:", error);
          alert('Error deleting employee. Please try again.');
        });
    }
  };

  return (
    <>
      {/* Header with Add Employee Button */}
      <Header 
        title="Staff Management" 
        description="Manage your staff and employee information"
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Employee
        </button>
      </Header>

      {/* Main Employee Management Interface */}
      <div className="p-6">
        <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
          {/* Employee List */}
          <div className="p-6">
            {employees.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No employees yet</h3>
                <p className="text-gray-500 mb-6">Get started by adding your first team member</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                >
                  Add Your First Employee
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow-md">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">First Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Active Employee</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{employee.first_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">{employee.last_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">{employee.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${employee.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {employee.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* Removed Edit button */}
                            <button
                              onClick={() => deleteEmployee(employee.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete employee"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      {isModalOpen && (
        <div className={`fixed inset-0 bg-white/5 backdrop-blur-[3px] flex items-center justify-center z-50 p-4 transition-opacity duration-200
          ${isModalVisible ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className={`bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto flex flex-col transition-transform duration-200
            ${isModalVisible ? 'scale-100' : 'scale-95'}
          `}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-5 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Add New Employee
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-white/80 hover:text-white p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 flex-1">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  value={newEmployee.first_name}
                  onChange={(e) => setNewEmployee({...newEmployee, first_name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={newEmployee.last_name}
                  onChange={(e) => setNewEmployee({...newEmployee, last_name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role *</label>
                <select
                  value={newEmployee.role}
                  onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select a role</option>
                  <option value="Barista">Barista</option>
                  <option value="Manager">Manager</option>
                  <option value="Assistant Manager">Assistant Manager</option>
                  <option value="Cashier">Cashier</option>
                  <option value="Baker">Baker</option>
                </select>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="active_status"
                  checked={newEmployee.is_active}
                  onChange={(e) => setNewEmployee({...newEmployee, is_active: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="active_status" className="text-sm font-medium text-gray-700">
                  Set as active employee
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createEmployee}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Employee;