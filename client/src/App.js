import "./App.css";
import AdminDashboard from "./components/AdminDashboard";
// import AdminDashboard from "./components/AdminDashboard";

import { Navbar } from "./components/Navbar";
import UserForm from "./components/UserForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
