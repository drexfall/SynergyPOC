import React from 'react';

const Textarea = ({ label, labelPosition = 'top', className, ...props }) => {
    return (
        <div className={`mb-4 ${labelPosition === 'left' || labelPosition === 'right' ? 'flex items-center' : ''}`}>
            {label && labelPosition === 'top' && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                </label>
            )}
            {label && labelPosition === 'left' && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                    {label}
                </label>
            )}
            <textarea
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm 
                ${className} ${labelPosition === 'left' || labelPosition === 'right' ? 'flex-grow' : ''}`}
                {...props}
            />
            {label && labelPosition === 'right' && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-2 flex-shrink-0">
                    {label}
                </label>
            )}
            {label && labelPosition === 'bottom' && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">
                    {label}
                </label>
            )}
        </div>
    );
};

export default Textarea;
