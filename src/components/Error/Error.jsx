import React from "react";

const Error = ({ message = "Something went wrong!", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-red-100 text-red-700 rounded-lg shadow-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 mb-3 text-red-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <p className="text-lg font-semibold">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;