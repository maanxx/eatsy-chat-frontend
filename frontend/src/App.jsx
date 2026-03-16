import { useState } from "react";
import LogIn from "./pages/LogIn.jsx";

function App() {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-orange-500">Eatsy Chat 🚀</h1>
      </div>
      <LogIn />
    </>
  );
}

export default App;
