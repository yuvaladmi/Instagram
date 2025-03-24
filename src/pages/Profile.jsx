
export function Profile() {
    return (
      <div className="flex flex-col items-center w-full min-h-screen bg-gray-100">
        <header className="w-full bg-white shadow-sm p-4 flex justify-between">
          <h1 className="text-xl font-bold">InstaClone</h1>
        </header>
        <div className="w-full max-w-4xl p-4">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            <div>
              <h2 className="text-lg font-bold">Username</h2>
              <p>Bio description here...</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 mt-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-full h-32 bg-gray-300"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }