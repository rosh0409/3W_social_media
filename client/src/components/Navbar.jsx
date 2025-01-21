import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Social Media</div>
      <ul className="navbar-links">
        <li>
          <Link to="/">User Form</Link>
        </li>
        <li>
          <Link to="/admin">Admin Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};
