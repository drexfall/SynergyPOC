import React from 'react';

const Input = ({ label, className, ...props }) => {
    return (
        <div className="mb-4">
            {label && <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">{label}</label>}
            <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:outline-none focus:shadow-outline 
                ${className}`}
                {...props}
            />
        </div>
    );
};

export default Input;
