// Update this page (the content is just a fallback if you fail to update the page)

import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-white">
      <div className="max-w-3xl w-full mx-auto p-10 bg-white/95 rounded-3xl shadow-2xl text-center border border-indigo-100">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-tr from-indigo-600 to-blue-400 text-white rounded-full w-20 h-20 flex items-center justify-center text-4xl font-extrabold mb-6 shadow-lg animate-bounce">
            <span>🚀</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-gray-900 leading-tight drop-shadow-lg">
            Land Your Dream Job <span className="text-indigo-600">Faster</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-6 max-w-xl mx-auto">
            Let AI do the heavy lifting. Instantly match your resume to top job descriptions and get noticed by recruiters. <span className="text-indigo-500 font-semibold">Upload your resume now</span> and unlock your next big opportunity!
          </p>
        </div>
        <div className="mb-10">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-gray-800 text-lg font-medium">
            <li className="flex items-center gap-3">
              <span className="text-indigo-600 text-2xl">★</span>
              Personalized AI-powered resume analysis
            </li>
            <li className="flex items-center gap-3">
              <span className="text-indigo-600 text-2xl">★</span>
              See your best job matches instantly
            </li>
            <li className="flex items-center gap-3">
              <span className="text-indigo-600 text-2xl">★</span>
              Get actionable tips to stand out
            </li>
            <li className="flex items-center gap-3">
              <span className="text-indigo-600 text-2xl">★</span>
              100% private, secure, and free to try
            </li>
          </ul>
        </div>
        <Link
          to="/upload"
          className="inline-block px-12 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold text-2xl shadow-xl hover:scale-105 hover:from-indigo-700 hover:to-blue-600 transition-all duration-200 mb-4 animate-pulse"
        >
          Upload Your Resume
        </Link>
        <div className="mt-8 text-gray-400 text-sm">
          No signup required. Your data stays private.
        </div>
        <div className="mt-10 text-xs text-gray-300">
          &copy; {new Date().getFullYear()} ResuMatch Genius. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Index;
