import { useState } from "react";

export function Home() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100">
      <header className="w-full bg-white shadow-sm p-4 flex justify-between">
        <h1 className="text-xl font-bold">InstaClone</h1>
        <input type="text" placeholder="Search..." className="border rounded-md p-1" />
      </header>
      <div className="w-full max-w-4xl flex gap-4 p-4">
        <div className="w-3/4">
          {/* Stories Section */}
          <div className="flex gap-2 mb-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-16 h-16 bg-gray-300 rounded-full"></div>
            ))}
          </div>
          {/* Posts Section */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white shadow rounded-md p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <span className="font-bold">User {i + 1}</span>
              </div>
              <div className="w-full h-60 bg-gray-300"></div>
              <p className="mt-2">This is a sample post.</p>
            </div>
          ))}
        </div>
        <aside className="w-1/4 hidden md:block">
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="font-bold mb-2">Suggested for You</h2>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span>User {i + 1}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

