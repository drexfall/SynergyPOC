import React from 'react';

const Columns = ({ components, renderComponent }) => {
    return (
        <div className="flex flex-wrap -mx-2">
            {components.map((col, index) => (
                <div key={index} className={`w-full md:w-${col.width}/12 px-2`}>
                    {col.components.map((childComponent) =>
                        renderComponent(childComponent)
                    )}
                </div>
            ))}
        </div>
    );
};

export default Columns;
