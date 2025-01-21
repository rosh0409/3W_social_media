import React, { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    socialMedia: "",
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("socialMedia", formData.socialMedia);
    for (let i = 0; i < formData.images.length; i++) {
      data.append("images", formData.images[i]);
    }

    try {
      const response = await axios.post(
        "https://threew-social-media-xsjd.onrender.com/user/submit",
        data
      );
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to submit the form.");
    }
  };

  return (
    <div className="form-container">
      <h1 style={{ textAlign: "center" }}>User Submission Form</h1>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="socialMedia">Social Media Handle</label>
          <input
            type="text"
            id="socialMedia"
            name="socialMedia"
            value={formData.socialMedia}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="images">Upload Images</label>
          <input
            accept="image/*"
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
