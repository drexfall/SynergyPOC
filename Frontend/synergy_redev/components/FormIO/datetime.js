import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

const DateTimeInput = ({ label, labelPosition = 'top', className, required, ...props }) => {
    const [value, setValue] = useState(new Date());
    const [isTouched, setIsTouched] = useState(false);

    const handleBlur = () => {
        setIsTouched(true);
    };

    return (
        <div className={`mb-4 ${labelPosition === 'left' || labelPosition === 'right' ? 'flex items-center' : ''}`}>
            {label && labelPosition === 'top' && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                </label>
            )}
            {label && labelPosition === 'left' && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-2 flex-shrink-0">
                    {label}
                </label>
            )}
            <Flatpickr
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm 
                ${className} ${labelPosition === 'left' || labelPosition === 'right' ? 'flex-grow' : ''}`}
                onChange={([date]) => setValue(date)}
                onBlur={handleBlur}
                {...props}
            />
            {required && isTouched && !value && (
                <span className="text-red-500 text-sm mt-1">This field is required</span>
            )}
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

export default DateTimeInput;
