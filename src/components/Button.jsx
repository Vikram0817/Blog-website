import React from 'react';

function Button({
    children, //text in button
    type ="button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props //properties other then classes
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor} ${type}`} {...props}>
            {children}
        </button>
    );
}

export default Button;