import React, { useState, useEffect } from "react";
import axios from "axios";
import Close from "../close.png";
const AdminDashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/admin/dash");
        console.log(response.data.data);
        setUsers(response.data?.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      <h1 key={"admin"}>Admin Dashboard</h1>
      <div className="container">
        {users.map((user) => (
          <div key={user.id} className="card" onClick={() => openModal(user)}>
            <div className="imageStack">
              {user?.images?.map((image, index) => (
                <div key={index} className="stackedImage">
                  <img
                    src={`http://localhost:8000/static/${image}`}
                    alt={user.name}
                    className="thumbnail"
                  />
                </div>
              ))}
            </div>
            <h3 className="name">{user.name}</h3>
            <p className="handle">{`@${user.socialMedia}`}</p>
          </div>
        ))}
      </div>

      {isModalOpen && selectedUser && (
        <div className="overlay">
          <div className="modal">
            <button className="closeButton" onClick={closeModal}>
              <img src={Close} alt="Close" />
            </button>
            <h2>{selectedUser.name}</h2>
            <p>{`@${selectedUser.socialMedia}`}</p>
            <div className="imageGallery">
              {selectedUser?.images?.map((image, index) => (
                <a
                  href={`http://localhost:8000/static/${image}`}
                  target="_blank"
                  rel="noopener noreferrer">
                  <img
                    src={`http://localhost:8000/static/${image}`}
                    alt={selectedUser.name}
                    className="fullImage"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
