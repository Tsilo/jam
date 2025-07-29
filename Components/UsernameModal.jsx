import React, { useState } from "react";
import Button from "./ui/Button.jsx";
import { useUsersStore } from "../stores/useUsersStore.js";

const UsernameModal = () => {
  const { me, setMe } = useUsersStore();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setName(""); // Reset input when closing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setMe({
        ...me,
        name: name,
      });
      closeModal();
    }
  };

  return (
    <>
      <Button
        onClick={openModal}
        className=" px-2 py-1 flex items-center gap-1.5"
      >
        {me.name || "Add Username"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Change your Username</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Enter your Username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 "
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UsernameModal;
