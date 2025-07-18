import React, { useState } from 'react';

const AddModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [link, setLink] = useState('');

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        setLink(''); // Reset input when closing
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (link.trim()) {
            // Handle the link submission here
            console.log('Link submitted:', link);
            closeModal();
        }
    };

    return (
        <>
            <button
                onClick={openModal}
                className='cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
                + Add
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Add new link</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700 text-xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* Modal Content */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">

                                <input
                                    type="url"
                                    id="link"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    placeholder="Enter your link here"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-2">
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
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddModal;